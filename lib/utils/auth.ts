import { cache } from "react";
import { cookies } from "next/headers";
import * as jose from "jose";

import { createClient } from "@/lib/supabase/client";
import { SessionUser } from "@/types/auth";

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
      return null;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured in environment variables.");
      return null;
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jose.jwtVerify(token, secret);
    const id = payload.id as string;

    if (!id) {
      return null;
    }

    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("users")
      .select("id, user_id, nickname")
      .eq("id", id)
      .maybeSingle();

    if (error || !user) {
      const isAbortError =
        error?.message?.includes("AbortError") ||
        error?.message?.includes("aborted") ||
        (error instanceof Error && error.name === "AbortError");

      if (error && !isAbortError) {
        console.error("Error fetching session user profile:", error);
      }
      return null;
    }

    return {
      id: user.id,
      user_id: user.user_id,
      nickname: user.nickname,
    };
  } catch {
    // JWT verification failed or expired
    return null;
  }
});
