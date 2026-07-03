import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/admin";
import type { Board } from "@/types/board";

export const getBoards = unstable_cache(
  async (): Promise<Board[]> => {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("boards")
      .select("abbr, name, category, created_at")
      .order("name", { ascending: true });

    if (error) {
      console.error("게시판 목록 조회 실패:", error);
      throw error;
    }

    return data || [];
  },
  ["boards-list"],
  {
    revalidate: 60 * 60 * 24, // 24시간 (하루) 캐시
    tags: ["boards"],  // 향후 revalidateTag("boards") 로 캐시 파괴 가능
  }
);
