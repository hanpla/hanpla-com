"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as jose from "jose";

import { createAdminClient } from "@/lib/supabase/admin";
import type { VoteType } from "@/types/post";

export interface FormActionState {
  success: boolean;
  postId?: number;
  error?: string;
}

/**
 * 게시글 조회수를 1 증가시킵니다.
 * - RPC(저장 프로시저)를 통한 원자적(Atomic) 증가를 우선 시도합니다.
 * - 데이터베이스에 프로시저가 정의되지 않은 경우 Read-then-Update 방식으로 대체(Fallback) 작동합니다.
 */
export const incrementPostViews = async (postId: number): Promise<void> => {
  try {
    const supabase = createAdminClient();

    // 1. RPC(increment_post_views)를 통한 원자적 증가 시도
    const { error: rpcError } = await supabase.rpc("increment_post_views", {
      post_id: postId,
    });

    // RPC가 존재하지 않거나 에러 발생 시 Fallback 작동 (Read-then-Write)
    if (rpcError) {
      console.warn(
        "RPC increment_post_views failed, falling back to read-then-write:",
        rpcError.message
      );

      const { data: post, error: selectError } = await supabase
        .from("posts")
        .select("views")
        .eq("id", postId)
        .single();

      if (selectError || !post) {
        console.error("Failed to select post views for fallback increment:", selectError);
        return;
      }

      const { error: updateError } = await supabase
        .from("posts")
        .update({ views: (post.views || 0) + 1 })
        .eq("id", postId);

      if (updateError) {
        console.error("Failed to update post views in fallback:", updateError);
      }
    }
  } catch (error) {
    console.error("Error in incrementPostViews server action:", error);
  }
};

/**
 * 새 게시글을 안전하게 생성하고 저장하는 Server Action입니다.
 * - 입력 필드 유효성 검사를 수행합니다.
 * - 세션 토큰을 검증하여 작성자 ID를 획득합니다.
 * - Supabase 데이터베이스에 저장한 뒤, 목록 캐시를 무효화 처리합니다.
 */
export const createPostAction = async (
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  try {
    const boardAbbr = formData.get("boardAbbr") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    // 1. 유효성 검사
    if (!boardAbbr) {
      return { success: false, error: "게시판 코드가 유효하지 않습니다." };
    }
    if (!title || title.trim() === "") {
      return { success: false, error: "제목을 입력해 주세요." };
    }
    if (title.length > 100) {
      return { success: false, error: "제목은 100자 이하로 입력해 주세요." };
    }
    if (!content || content.trim() === "") {
      return { success: false, error: "본문 내용을 입력해 주세요." };
    }

    // 2. 사용자 인증 검증 (cookies & JWT)
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is missing");
    }

    let authorId: string;
    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jose.jwtVerify(token, secret);
      if (!payload.id) {
        throw new Error("Invalid JWT payload: missing id claim");
      }
      authorId = payload.id as string;
    } catch (err) {
      console.error("JWT verification failed in createPostAction:", err);
      return { success: false, error: "유효하지 않거나 만료된 세션입니다. 다시 로그인해 주세요." };
    }

    // 3. Supabase DB 글 저장
    const supabase = createAdminClient();
    const { data: insertedPost, error: insertError } = await supabase
      .from("posts")
      .insert({
        board_abbr: boardAbbr,
        title: title.trim(),
        content: content.trim(),
        author_id: authorId,
        views: 0,
        likes: 0,
        dislikes: 0,
        comments_count: 0,
      })
      .select("id")
      .single();

    if (insertError || !insertedPost) {
      console.error("Supabase post insert failed:", insertError);
      return { success: false, error: "게시글 저장에 실패했습니다. 잠시 후 다시 시도해 주세요." };
    }

    return {
      success: true,
      postId: insertedPost.id,
    };
  } catch (error) {
    console.error("Unexpected error in createPostAction server action:", error);
    return {
      success: false,
      error: "알 수 없는 오류가 발생했습니다.",
    };
  }
};

export interface VoteActionResult {
  success: boolean;
  likes?: number;
  dislikes?: number;
  userVote?: VoteType;
  error?: string;
}

/**
 * 게시글 추천/비추천 토글 서버 액션입니다.
 * - 로그인 여부 및 JWT 세션을 검증합니다.
 * - 동일 투표 클릭 시 취소, 타 투표 클릭 시 변경, 신규 클릭 시 추천/비추천을 처리합니다.
 * - post_votes 테이블 및 posts 테이블 수치를 반영한 후 캐시를 무효화합니다.
 */
export const votePostAction = async (
  postId: number,
  targetVote: "like" | "dislike"
): Promise<VoteActionResult> => {
  try {
    if (!postId || !targetVote) {
      return { success: false, error: "유효하지 않은 요청입니다." };
    }

    // 1. 사용자 세션 검증
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is missing");
    }

    let userId: string;
    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jose.jwtVerify(token, secret);
      if (!payload.id) {
        throw new Error("Missing id in payload");
      }
      userId = payload.id as string;
    } catch {
      return { success: false, error: "유효하지 않은 세션입니다. 다시 로그인해 주세요." };
    }

    const supabase = createAdminClient();

    // 2. 현재 게시글의 likes/dislikes 조회
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("likes, dislikes")
      .eq("id", postId)
      .single();

    if (postError || !post) {
      return { success: false, error: "게시글을 찾을 수 없습니다." };
    }

    const currentLikes = post.likes || 0;
    const currentDislikes = post.dislikes || 0;

    // 3. 기존 투표 상태 조회 (post_votes 테이블)
    let existingVote: VoteType = null;
    const { data: voteData, error: voteSelectError } = await supabase
      .from("post_votes")
      .select("vote_type")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle();

    if (!voteSelectError && voteData) {
      existingVote = voteData.vote_type as VoteType;
    }

    let newVote: VoteType = null;
    let newLikes = currentLikes;
    let newDislikes = currentDislikes;

    if (existingVote === targetVote) {
      // 동일 버튼 클릭 -> 투표 취소
      newVote = null;
      if (targetVote === "like") {
        newLikes = Math.max(0, currentLikes - 1);
      } else {
        newDislikes = Math.max(0, currentDislikes - 1);
      }

      await supabase.from("post_votes").delete().eq("post_id", postId).eq("user_id", userId);
    } else if (existingVote !== null) {
      // 다른 버튼 클릭 -> 투표 변경 (like -> dislike 또는 dislike -> like)
      newVote = targetVote;
      if (targetVote === "like") {
        newLikes = currentLikes + 1;
        newDislikes = Math.max(0, currentDislikes - 1);
      } else {
        newLikes = Math.max(0, currentLikes - 1);
        newDislikes = currentDislikes + 1;
      }

      await supabase
        .from("post_votes")
        .update({ vote_type: targetVote })
        .eq("post_id", postId)
        .eq("user_id", userId);
    } else {
      // 신규 투표
      newVote = targetVote;
      if (targetVote === "like") {
        newLikes = currentLikes + 1;
      } else {
        newDislikes = currentDislikes + 1;
      }

      await supabase.from("post_votes").insert({
        post_id: postId,
        user_id: userId,
        vote_type: targetVote,
      });
    }

    // 4. posts 테이블 likes / dislikes 수치 업데이트
    const { error: updateError } = await supabase
      .from("posts")
      .update({
        likes: newLikes,
        dislikes: newDislikes,
      })
      .eq("id", postId);

    if (updateError) {
      console.error("Failed to update post likes/dislikes:", updateError);
      return { success: false, error: "투표 수 반영에 실패했습니다." };
    }

    // 5. 관련 캐시 무효화
    revalidatePath("/", "layout");

    return {
      success: true,
      likes: newLikes,
      dislikes: newDislikes,
      userVote: newVote,
    };
  } catch (error) {
    console.error("Error in votePostAction:", error);
    return { success: false, error: "알 수 없는 오류가 발생했습니다." };
  }
};
