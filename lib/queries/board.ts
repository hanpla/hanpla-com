import { cacheLife, cacheTag } from "next/cache";

import { createClient } from "@/lib/supabase/client";

export interface Board {
  abbr: string;
  name: string;
  category: string;
  created_at: string;
}

export interface BoardName {
  name: string;
}

export const getBoards = async (): Promise<Board[]> => {
  "use cache";
  cacheLife("days");
  cacheTag("boards");

  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBoardName = async (abbr: string): Promise<BoardName | null> => {
  "use cache";
  cacheLife("days");

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("boards")
      .select("name")
      .eq("abbr", abbr)
      .maybeSingle();

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
