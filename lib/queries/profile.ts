import type { QueryClient } from "@tanstack/react-query";
import type { PostWithRelations } from "@/types/post";
import type { UserCommentWithPost } from "@/types/comment";

export const USER_POSTS_QUERY_KEY = "userPosts";
export const USER_COMMENTS_QUERY_KEY = "userComments";

/**
 * 게시글 작성/수정/삭제 시 프로필 작성 글 쿼리 캐시를 무효화(파괴)합니다.
 */
export const invalidateUserPostsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [USER_POSTS_QUERY_KEY] });
};

/**
 * 댓글 작성/삭제 시 프로필 작성 댓글 쿼리 캐시를 무효화(파괴)합니다.
 */
export const invalidateUserCommentsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: [USER_COMMENTS_QUERY_KEY] });
};

export interface UserPostsResponse {
  posts: PostWithRelations[];
  totalCount: number;
}

export interface UserCommentsResponse {
  comments: UserCommentWithPost[];
  totalCount: number;
}

/**
 * 로그인한 사용자가 작성한 게시글 목록을 API로부터 가져옵니다.
 */
export const fetchUserPosts = async (
  page: number,
  pageSize: number = 10
): Promise<UserPostsResponse> => {
  const res = await fetch(`/api/profile/posts?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return res.json();
};

/**
 * 로그인한 사용자가 작성한 댓글 목록을 API로부터 가져옵니다.
 */
export const fetchUserComments = async (
  page: number,
  pageSize: number = 10
): Promise<UserCommentsResponse> => {
  const res = await fetch(`/api/profile/comments?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user comments");
  }
  return res.json();
};
