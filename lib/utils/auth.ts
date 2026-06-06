import { cookies } from "next/headers";
import * as jose from "jose";

export interface SessionUser {
  userId: string;
  user_id: string;
  nickname: string;
}

export const getSessionUser = async (): Promise<SessionUser | null> => {
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

    return {
      userId: payload.userId as string,
      user_id: payload.user_id as string,
      nickname: payload.nickname as string,
    };
  } catch {
    // JWT verification failed or expired
    return null;
  }
};
