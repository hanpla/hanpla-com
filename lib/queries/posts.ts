import { cacheLife } from "next/cache";

import { createClient } from "@/lib/supabase/client";
import { DEFAULT_PAGE_SIZE, BEST_POST_LIKES_THRESHOLD } from "@/lib/constants";
import { formatRelativeTime, formatTimeOrDate } from "@/lib/utils/time";
import type { Post, GetBoardPostsOptions, GetBestPostsOptions } from "@/types/post";

/**
 * Fetches all posts for a given board abbreviation.
 * Excludes large 'content' field to optimize database/network bandwidth.
 * Cache configuration: minutes (requires real-time updates)
 */
export const getPostsByBoardAbbr = async ({
  boardAbbr,
  filter,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  searchType,
  searchKeyword,
}: GetBoardPostsOptions): Promise<{ posts: Post[]; totalCount: number }> => {
  "use cache";
  cacheLife("boardList");

  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select(
        "id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users(nickname)",
        { count: "exact" }
      )
      .eq("board_abbr", boardAbbr);

    if (filter === "popular") {
      query = query.gte("likes", 10);
    }

    // 인라인 검색 필터 적용 (any 타입 매개변수 사용 금지 규정 준수 및 자동 추론 유지)
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
      console.error(`Error fetching posts for board ${boardAbbr}:`, error);
      return { posts: [], totalCount: 0 };
    }

    const posts = ((data as unknown as Post[]) || []).map((post) => ({
      ...post,
      formattedTime: formatTimeOrDate(post.created_at),
      formattedRelativeTime: formatRelativeTime(post.created_at),
    }));

    return {
      posts,
      totalCount: count || 0,
    };
  } catch (error) {
    console.error(`Error in getPostsByBoardAbbr for board ${boardAbbr}:`, error);
    return { posts: [], totalCount: 0 };
  }
};

/**
 * Fetches all best posts across all boards.
 * Requires likes >= BEST_POST_LIKES_THRESHOLD.
 * Cache configuration: hours (semi-static, longer caching)
 */
export const getBestPosts = async ({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  searchType,
  searchKeyword,
}: GetBestPostsOptions = {}): Promise<{ posts: Post[]; totalCount: number }> => {
  "use cache";
  cacheLife("hours");

  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select(
        "id, board_abbr, title, author_id, views, likes, dislikes, comments_count, created_at, users(nickname), boards(*)",
        { count: "exact" }
      )
      .gte("likes", BEST_POST_LIKES_THRESHOLD);

    // 인라인 검색 필터 적용 (any 타입 매개변수 사용 금지 규정 준수 및 자동 추론 유지)
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

    const posts = ((data as unknown as Post[]) || []).map((post) => ({
      ...post,
      formattedTime: formatTimeOrDate(post.created_at),
      formattedRelativeTime: formatRelativeTime(post.created_at),
    }));

    return {
      posts,
      totalCount: count || 0,
    };
  } catch (error) {
    console.error("Error in getBestPosts:", error);
    return { posts: [], totalCount: 0 };
  }
};

/**
 * Fetches a single post by its ID, including all fields (such as 'content') and joined 'boards' details.
 */
export const getPostById = async (id: number): Promise<Post | null> => {
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
