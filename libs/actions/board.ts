"use server";

import { createClient } from "../utils/supabase/server";

// Types
import { BoardType, GetPostListResult } from "../types/board";
import { maskIp } from "../utils/utils";

interface GetPostListProps {
  abbr: string;
  page: number;
  limit: number;
  likeCount: number;
  searchType?: string;
  searchKeyword?: string;
}

export async function getAllBoards({
  orderBy = "name",
  ascending = true,
}: {
  orderBy?: string;
  ascending?: boolean;
}): Promise<BoardType[]> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("boards")
      .select("abbr, name")
      .order(orderBy, { ascending });

    if (error) {
      console.error("Supabase 에러:", error.message);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error("서버 액션 실행 에러:", error);
    return [];
  }
}

export async function getAbbrName(abbr: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("boards")
      .select("name")
      .eq("abbr", abbr)
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }

    return data?.name;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getPostList({
  abbr,
  page = 1,
  limit = 20,
  likeCount = 0,
  searchType,
  searchKeyword,
}: GetPostListProps): Promise<GetPostListResult> {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    let query = supabase
      .from("posts")
      .select(
        "id,board_name,abbr,title,nickname,views,likes,comments,is_login,user_ip,created_at",
        { count: "exact" },
      )
      .gte("likes", likeCount);

    if (abbr !== "best") {
      query = query.eq("abbr", abbr);
    }

    if (searchKeyword && searchType) {
      query = query.ilike(searchType, `%${searchKeyword}%`);
    }

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("게시글이 없습니다.");
      return { postList: [], totalCount: 0 };
    }

    const maskedData =
      data?.map((post) => ({
        id: post.id,
        title: post.title,
        boardName: post.board_name,
        abbr: post.abbr,
        nickname: post.nickname,
        views: post.views,
        comments: post.comments,
        likes: post.likes,
        isLogin: post.is_login,
        ip: post.user_ip ? maskIp(post.user_ip) : "",
        createdAt: post.created_at,
      })) || [];

    return {
      postList: maskedData,
      totalCount: count || 0,
    };
  } catch (error) {
    console.log(error);
    return { postList: [], totalCount: 0 };
  }
}
