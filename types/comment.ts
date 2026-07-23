export interface Comment {
  id: number;
  post_id: number;
  author_id: string;
  parent_id: number | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CommentWithAuthor extends Comment {
  author: {
    nickname: string;
  } | null;
  replies?: CommentWithAuthor[];
}

export interface CreateCommentInput {
  postId: number;
  content: string;
  parentId?: number | null;
}

export interface UserCommentWithPost extends Comment {
  post: {
    id: number;
    board_abbr: string;
    title: string;
  } | null;
}
