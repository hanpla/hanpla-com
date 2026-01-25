"use server";

import { createClient } from "../utils/supabase/server";

// Types
import { BoardType } from "../types/board";

export async function getAllBoards({
  orderBy = "name",
  ascending = true,
}: {
  orderBy?: string;
  ascending?: boolean;
}): Promise<BoardType[]> {
  try {
    const supabase = await createClient();

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
