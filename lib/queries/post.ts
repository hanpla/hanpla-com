import { unstable_cache } from "next/cache";

import { createAdminClient } from "../supabase/admin";
import type { PostWithRelations } from "@/types/post";

export interface GetBestPostsOptions {
  page?: number;
  limit?: number;
  searchType?: "title" | "content" | "title_content" | "author";
  searchKeyword?: string;
}

export const getBestPosts = (options: GetBestPostsOptions = {}) => {
  const { page = 1, limit = 20, searchType = "", searchKeyword = "" } = options;

  return unstable_cache(
    async (): Promise<{ posts: PostWithRelations[]; totalCount: number }> => {
      try {
        const supabase = createAdminClient();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const authorSelect = searchType === "author" ? "author:users!inner(nickname)" : "author:users(nickname)";

        let query = supabase
          .from("posts")
          .select(`
            id,
            board_abbr,
            title,
            content,
            author_id,
            views,
            likes,
            dislikes,
            comments_count,
            created_at,
            ${authorSelect}
          `, { count: "exact" });

        // 인기글 필터 조건(추천 10개 이상) 및 정렬 조건(최신순) 적용
        query = query
          .gte("likes", 10)
          .order("created_at", { ascending: false });

        // 검색 조건 적용
        if (searchKeyword && searchType) {
          if (searchType === "title") {
            query = query.ilike("title", `%${searchKeyword}%`);
          } else if (searchType === "content") {
            query = query.textSearch("content", searchKeyword, { type: "plain" });
          } else if (searchType === "title_content") {
            query = query.or(`title.ilike.%${searchKeyword}%,content.plfts.${searchKeyword}`);
          } else if (searchType === "author") {
            query = query.ilike("users.nickname", `%${searchKeyword}%`);
          }
        }

        // 페이지네이션 적용
        query = query.range(from, to);

        const { data: posts, error, count } = await query;

        if (error) {
          console.error("인기 게시글 조회 실패:", error);
          throw error;
        }

        const queryData = posts as unknown as PostWithRelations[];
        const bestPosts = (queryData ?? []).map((post) => ({
          id: post.id,
          board_abbr: post.board_abbr,
          title: post.title,
          content: post.content,
          author_id: post.author_id,
          views: post.views,
          likes: post.likes,
          dislikes: post.dislikes,
          comments_count: post.comments_count,
          created_at: post.created_at,
          author: post.author,
        }));

        return {
          posts: bestPosts,
          totalCount: count ?? 0,
        };
      } catch (error) {
        console.error(error);
        return {
          posts: [],
          totalCount: 0,
        };
      }
    },
    ["best_posts", String(page), String(limit), searchType, searchKeyword],
    {
      revalidate: 60 * 10,
      tags: ["posts", "best-posts"],
    }
  )();
};

export interface GetBoardPostsOptions {
  boardAbbr: string;
  filter?: "all" | "popular";
  page?: number;
  pageSize?: number;
  searchType?: "title" | "content" | "title_content" | "author";
  searchKeyword?: string;
}

export const getPostsByBoardAbbr = async (
  options: GetBoardPostsOptions
): Promise<{ posts: PostWithRelations[]; totalCount: number }> => {
  const {
    boardAbbr,
    filter = "all",
    page = 1,
    pageSize = 20,
    searchType = "",
    searchKeyword = "",
  } = options;

  try {
    const supabase = createAdminClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const authorSelect = searchType === "author" ? "author:users!inner(nickname)" : "author:users(nickname)";

    let query = supabase
      .from("posts")
      .select(`
        id,
        board_abbr,
        title,
        content,
        author_id,
        views,
        likes,
        dislikes,
        comments_count,
        created_at,
        ${authorSelect}
      `, { count: "exact" })
      .eq("board_abbr", boardAbbr);

    // 필터 조건 적용 (인기글: 추천 10개 이상)
    if (filter === "popular") {
      query = query.gte("likes", 10);
    }

    // 정렬 조건 적용 (최신순)
    query = query.order("created_at", { ascending: false });

    // 검색 조건 적용
    if (searchKeyword && searchType) {
      if (searchType === "title") {
        query = query.ilike("title", `%${searchKeyword}%`);
      } else if (searchType === "content") {
        query = query.textSearch("content", searchKeyword, { type: "plain" });
      } else if (searchType === "title_content") {
        query = query.or(`title.ilike.%${searchKeyword}%,content.plfts.${searchKeyword}`);
      } else if (searchType === "author") {
        query = query.ilike("users.nickname", `%${searchKeyword}%`);
      }
    }

    // 페이지네이션 적용
    query = query.range(from, to);

    const { data: posts, error, count } = await query;

    if (error) {
      console.error(`게시판(${boardAbbr}) 글 목록 조회 실패:`, error);
      throw error;
    }

    const queryData = posts as unknown as PostWithRelations[];
    const boardPosts = (queryData ?? []).map((post) => ({
      id: post.id,
      board_abbr: post.board_abbr,
      title: post.title,
      content: post.content,
      author_id: post.author_id,
      views: post.views,
      likes: post.likes,
      dislikes: post.dislikes,
      comments_count: post.comments_count,
      created_at: post.created_at,
      author: post.author,
    }));

    return {
      posts: boardPosts,
      totalCount: count ?? 0,
    };
  } catch (error) {
    console.error(error);
    return {
      posts: [],
      totalCount: 0,
    };
  }
};

export const getPostById = async (id: number): Promise<PostWithRelations | null> => {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        board_abbr,
        title,
        content,
        author_id,
        views,
        likes,
        dislikes,
        comments_count,
        created_at,
        author:users(nickname)
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error(`게시글(${id}) 조회 실패:`, error);
      return null;
    }

    return data as unknown as PostWithRelations;
  } catch (error) {
    console.error(error);
    return null;
  }
};
