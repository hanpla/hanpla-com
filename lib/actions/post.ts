"use server";

import { createAdminClient } from "@/lib/supabase/admin";

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
      console.warn("RPC increment_post_views failed, falling back to read-then-write:", rpcError.message);
      
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
