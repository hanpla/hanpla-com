import { createClient } from "@/lib/supabase/client";
import { cacheLife } from "next/cache";

export interface Post {
  id: number;
  board_abbr: string;
  title: string;
  content?: unknown; // Tiptap JSON document (JSONB), optional on lists
  author_id: string;
  views: number;
  likes: number;
  dislikes: number;
  comments_count: number;
  created_at: string; // ISO String format
  users: {
    nickname: string;
  } | null;
}

export const getPostsByBoardAbbr = async (
  boardAbbr: string,
  filter?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ posts: Post[]; totalCount: number }> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select("id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users(nickname)", { count: "exact" })
      .eq("board_abbr", boardAbbr);

    if (filter === "popular") {
      // 인기글 조건: 추천수(likes) 10개 이상
      query = query.gte("likes", 10);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error(`Error fetching posts for board ${boardAbbr}:`, error);
      return { posts: [], totalCount: 0 };
    }

    return {
      posts: (data as unknown as Post[]) || [],
      totalCount: count || 0,
    };
  } catch (error) {
    console.error(`Error in getPostsByBoardAbbr for board ${boardAbbr}:`, error);
    return { posts: [], totalCount: 0 };
  }
};

/**
 * Fetches a single post by its ID, including all fields (such as 'content').
 */
export const getPostById = async (id: number): Promise<Post | null> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(nickname)")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching post by id ${id}:`, error);
      return null;
    }

    return (data as unknown as Post) || null;
  } catch (error) {
    console.error(`Error in getPostById for id ${id}:`, error);
    return null;
  }
};
