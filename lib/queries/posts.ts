import { createClient } from "@/lib/supabase/client";
import { cacheLife } from "next/cache";
import type { Board } from "@/lib/queries/board";
import { DEFAULT_PAGE_SIZE, BEST_POST_LIKES_THRESHOLD } from "@/lib/constants";

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
  boards?: Board | null; // Joined board details
}

/**
 * Fetches all posts for a given board abbreviation.
 * Excludes large 'content' field to optimize database/network bandwidth.
 */
export const getPostsByBoardAbbr = async (
  boardAbbr: string,
  filter?: string,
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  searchType?: string,
  searchKeyword?: string
): Promise<{ posts: Post[]; totalCount: number }> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select(
        "id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users!inner(nickname)",
        { count: "exact" }
      )
      .eq("board_abbr", boardAbbr);

    if (filter === "popular") {
      // 인기글 조건: 추천수(likes) 10개 이상
      query = query.gte("likes", 10);
    }

    if (searchKeyword && searchKeyword.trim()) {
      const keyword = `%${searchKeyword.trim()}%`;
      if (searchType === "content") {
        // Tiptap JSONB 본문 검색: PostgreSQL Full-Text Search 접두사 매칭 이용
        const tokens = searchKeyword.trim().split(/\s+/).filter(Boolean);
        const tsQuery = tokens.map((token) => `'${token.replace(/'/g, "''")}':*`).join(" & ");
        query = query.textSearch("content", tsQuery, { type: "raw" as "plain" });
      } else if (searchType === "author") {
        query = query.ilike("users.nickname", keyword);
      } else {
        // 'title' 또는 기본값: 제목 검색
        query = query.ilike("title", keyword);
      }
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
 * Fetches a single post by its ID, including all fields (such as 'content') and joined 'boards' details.
 */
export const getPostById = async (id: number): Promise<Post | null> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*, users(nickname), boards(*)")
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

/**
 * Fetches all best posts across all boards.
 * Requires likes >= BEST_POST_LIKES_THRESHOLD.
 */
export const getBestPosts = async (
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  searchType?: string,
  searchKeyword?: string
): Promise<{ posts: Post[]; totalCount: number }> => {
  "use cache";
  cacheLife("minutes");

  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select(
        "id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users!inner(nickname), boards(*)",
        { count: "exact" }
      )
      .gte("likes", BEST_POST_LIKES_THRESHOLD);

    if (searchKeyword && searchKeyword.trim()) {
      const keyword = `%${searchKeyword.trim()}%`;
      if (searchType === "content") {
        const tokens = searchKeyword.trim().split(/\s+/).filter(Boolean);
        const tsQuery = tokens.map((token) => `'${token.replace(/'/g, "''")}':*`).join(" & ");
        query = query.textSearch("content", tsQuery, { type: "raw" as "plain" });
      } else if (searchType === "author") {
        query = query.ilike("users.nickname", keyword);
      } else {
        query = query.ilike("title", keyword);
      }
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Error fetching best posts:", error);
      return { posts: [], totalCount: 0 };
    }

    return {
      posts: (data as unknown as Post[]) || [],
      totalCount: count || 0,
    };
  } catch (error) {
    console.error("Error in getBestPosts:", error);
    return { posts: [], totalCount: 0 };
  }
};

