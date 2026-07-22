import { createAdminClient } from "../supabase/admin";
import type { CommentWithAuthor } from "@/types/comment";

// 평탄화된 댓글/답글 목록을 부모-자식 트리 구조로 변환하는 유틸 헬퍼
const nestComments = (rawComments: CommentWithAuthor[]): CommentWithAuthor[] => {
  const commentMap = new Map<number, CommentWithAuthor>();
  const rootComments: CommentWithAuthor[] = [];

  // 1. 모든 댓글을 객체 및 replies 빈 배열로 맵핑
  rawComments.forEach((c) => {
    const commentNode: CommentWithAuthor = {
      ...c,
      replies: [],
    };
    commentMap.set(c.id, commentNode);
  });

  // 2. parent_id 유무에 따라 트리 구축
  rawComments.forEach((c) => {
    const current = commentMap.get(c.id);
    if (!current) return;

    if (c.parent_id && commentMap.has(c.parent_id)) {
      const parent = commentMap.get(c.parent_id);
      parent?.replies?.push(current);
    } else {
      rootComments.push(current);
    }
  });

  return rootComments;
};

// 특정 게시글의 전체 댓글 목록 조회 및 계층화
export const getCommentsByPostId = async (postId: number): Promise<CommentWithAuthor[]> => {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        id,
        post_id,
        author_id,
        parent_id,
        content,
        created_at,
        updated_at,
        author:users(nickname)
      `
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch comments:", error.message);
      return [];
    }

    const rawList = (data || []) as unknown as CommentWithAuthor[];
    return nestComments(rawList);
  } catch (err) {
    console.error("Error in getCommentsByPostId:", err);
    return [];
  }
};
