import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export interface Board {
  abbr: string;
  name: string;
  category: string;
  created_at: string;
}

export const getBoards = async (): Promise<Board[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

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
