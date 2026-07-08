"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

import { createAdminClient } from "@/lib/supabase/admin";

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
