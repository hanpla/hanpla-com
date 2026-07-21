export interface Post {
  id: number;
  board_abbr: string;
  title: string;
  content?: unknown; // Tiptap JSON document (JSONB)
  author_id: string;
  views: number;
  likes: number;
  dislikes: number;
  comments_count: number;
  created_at: string; // ISO String format
}

export type VoteType = "like" | "dislike" | null;

export interface PostWithRelations extends Post {
  author: {
    nickname: string;
  } | null;
}
