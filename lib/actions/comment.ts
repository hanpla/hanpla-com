"use server";

import { revalidatePath } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/utils/auth";
import type { CreateCommentInput } from "@/types/comment";

export interface CommentActionResult {
  success: boolean;
  error?: string;
}

// 댓글 또는 답글(대댓글) 작성 액션
export const createCommentAction = async (
  input: CreateCommentInput
): Promise<CommentActionResult> => {
  try {
    const { postId, content, parentId = null } = input;

    // 1. 세션 사용자 인증 확인
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { success: false, error: "로그인이 필요한 기능입니다." };
    }

    // 2. 유효성 검사
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return { success: false, error: "댓글 내용을 입력해 주세요." };
    }

    if (trimmedContent.length > 500) {
      return { success: false, error: "댓글은 최대 500자까지 입력 가능합니다." };
    }

    const supabase = createAdminClient();

    // 3. 부모 댓글 존재 확인 (parentId가 있는 경우)
    if (parentId) {
      const { data: parentComment, error: parentCheckError } = await supabase
        .from("comments")
        .select("id, post_id")
        .eq("id", parentId)
        .single();

      if (parentCheckError || !parentComment) {
        return { success: false, error: "존재하지 않거나 삭제된 부모 댓글입니다." };
      }

      if (parentComment.post_id !== postId) {
        return { success: false, error: "게시글 데이터가 일치하지 않습니다." };
      }
    }

    // 4. DB Insert
    const { error: insertError } = await supabase.from("comments").insert({
      post_id: postId,
      author_id: sessionUser.id,
      parent_id: parentId,
      content: trimmedContent,
    });

    if (insertError) {
      console.error("Failed to insert comment:", insertError.message);
      return { success: false, error: "댓글 등록 중 오류가 발생했습니다." };
    }

    // 5. 캐시 갱신
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error in createCommentAction:", error);
    return { success: false, error: "서버 내부 오류가 발생했습니다." };
  }
};

// 댓글 또는 답글 삭제 액션
export const deleteCommentAction = async (
  commentId: number,
  postId: number
): Promise<CommentActionResult> => {
  try {
    // 1. 세션 사용자 인증 확인
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { success: false, error: "로그인이 필요한 기능입니다." };
    }

    const supabase = createAdminClient();

    // 2. 댓글 존재 및 본인 소유 확인
    const { data: comment, error: selectError } = await supabase
      .from("comments")
      .select("id, author_id, post_id")
      .eq("id", commentId)
      .single();

    if (selectError || !comment) {
      return { success: false, error: "존재하지 않거나 이미 삭제된 댓글입니다." };
    }

    if (comment.post_id !== postId) {
      return { success: false, error: "게시글 데이터가 일치하지 않습니다." };
    }

    if (comment.author_id !== sessionUser.id) {
      return { success: false, error: "본인이 작성한 댓글만 삭제할 수 있습니다." };
    }

    // 3. 댓글 삭제 (ON DELETE CASCADE로 대댓글도 함께 자동 삭제됨)
    const { error: deleteError } = await supabase.from("comments").delete().eq("id", commentId);

    if (deleteError) {
      console.error("Failed to delete comment:", deleteError.message);
      return { success: false, error: "댓글 삭제 중 오류가 발생했습니다." };
    }

    // 4. 캐시 갱신
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error in deleteCommentAction:", error);
    return { success: false, error: "서버 내부 오류가 발생했습니다." };
  }
};
