import { cache } from "react";
import { cookies } from "next/headers";
import * as jose from "jose";

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
    const user_id = payload.user_id as string;
    const nickname = payload.nickname as string;

    if (!id || !user_id || !nickname) {
      return null;
    }

    return {
      id,
      user_id,
      nickname,
    };
  } catch {
    // JWT verification failed or expired
    return null;
  }
});
