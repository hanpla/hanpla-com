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
            author:users(nickname)
          `, { count: "exact" });

        // 정렬 조건 적용 (좋아요 순 -> 조회수 순)
        query = query
          .order("likes", { ascending: false })
          .order("views", { ascending: false });

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
