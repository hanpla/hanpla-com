import { createAdminClient } from "../supabase/admin";
import type { CommentWithAuthor, UserCommentWithPost } from "@/types/comment";

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

  // 3. 원댓글 목록은 최신순(내림차순) 정렬
  rootComments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // 4. 각 원댓글의 답글(대댓글) 목록은 대화 흐름에 맞게 작성순(오름차순) 정렬
  commentMap.forEach((node) => {
    if (node.replies && node.replies.length > 0) {
      node.replies.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
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
      .order("created_at", { ascending: false });

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

/**
 * 특정 사용자가 작성한 댓글 목록을 최신순으로 조회합니다.
 */
export const getCommentsByUserId = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ comments: UserCommentWithPost[]; totalCount: number }> => {
  try {
    const supabase = createAdminClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const {
      data: comments,
      error,
      count,
    } = await supabase
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
        post:posts!comments_post_id_fkey(id, board_abbr, title)
      `,
        { count: "exact" }
      )
      .eq("author_id", userId)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(`사용자(${userId}) 댓글 목록 조회 실패:`, error.message);
      return { comments: [], totalCount: 0 };
    }

    return {
      comments: (comments as unknown as UserCommentWithPost[]) ?? [],
      totalCount: count ?? 0,
    };
  } catch (err) {
    console.error("Error in getCommentsByUserId:", err);
    return { comments: [], totalCount: 0 };
  }
};
