import { createClient } from "@/lib/supabase/client";
import { cacheLife, cacheTag } from "next/cache";

export interface Board {
  abbr: string;
  name: string;
  category: string;
  created_at: string;
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
      console.error("Error fetching boards from Supabase:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getBoards query helper:", error);
    return [];
  }
};


export const getBoardByAbbr = async (abbr: string): Promise<Board | null> => {
  "use cache";
  cacheLife("days");

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("boards")
      .select("*")
      .eq("abbr", abbr)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching board for abbr ${abbr}:`, error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(`Error in getBoardByAbbr for abbr ${abbr}:`, error);
    return null;
  }
};
