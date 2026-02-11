"use server";

// Utils
import { formatIp } from "../utils/format";
import { createClient } from "../utils/supabase/server";

// Types
import { PostDetailDataType } from "../types/post";

export async function getPostDetailData(
  postId: number,
): Promise<PostDetailDataType | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        title, content, nickname, views, comments, 
        likes, dislikes, is_login, user_ip, created_at
      `,
      )
      .eq("id", postId)
      .maybeSingle();

    if (error) {
      console.log(error);
      return null;
    }

    if (data && data.user_ip) {
      data.user_ip = formatIp(data.user_ip);
    }

    return data as PostDetailDataType | null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
