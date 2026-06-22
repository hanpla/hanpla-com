import type { Board } from "@/lib/queries/board";

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

export interface PostWithRelations extends Post {
  users: {
    nickname: string;
  } | null;
  boards?: Board | null; // Joined board details
  formattedTime?: string;
  formattedRelativeTime?: string;
}


export interface GetBoardPostsOptions {
  boardAbbr: string;
  filter?: string;
  page?: number;
  pageSize?: number;
  searchType?: string;
  searchKeyword?: string;
}

export interface GetBestPostsOptions {
  page?: number;
  pageSize?: number;
  searchType?: string;
  searchKeyword?: string;
}
