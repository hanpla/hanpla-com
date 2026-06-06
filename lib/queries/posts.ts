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

/**
 * Fetches all posts for a given board abbreviation.
 * Excludes large 'content' field to optimize database/network bandwidth.
 */
export const getPostsByBoardAbbr = async (boardAbbr: string): Promise<Post[]> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users(nickname)")
      .eq("board_abbr", boardAbbr)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`Error fetching posts for board ${boardAbbr}:`, error);
      return [];
    }

    return (data as unknown as Post[]) || [];
  } catch (error) {
    console.error(`Error in getPostsByBoardAbbr for board ${boardAbbr}:`, error);
    return [];
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
