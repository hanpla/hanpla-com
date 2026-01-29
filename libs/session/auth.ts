import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

// Types
import { SessionPayload } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET!;
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

/**
 * [세션 검증 함수]
 * 서버 컴포넌트나 액션에서 현재 로그인 상태를 확인할 때 사용.
 */
export async function verifySession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    // 토큰 검증 시도
    const { payload } = await jwtVerify(token, encodedSecret, {
      algorithms: ["HS256"], // 알고리즘 "RS256" 등
    });

    return {
      userId: payload.userId as string,
      nickname: payload.nickname as string,
      role: payload.role as string,
    } as SessionPayload;
  } catch (err) {
    // 만료되었거나 조작된 토큰인 경우
    return null;
  }
}

/**
 * [세션 생성 함수]
 * 로그인 성공 시 토큰을 생성하고 쿠키에 저장.
 */
export async function createSession(userData: SessionPayload) {
  const token = await new SignJWT(userData)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(encodedSecret);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

/**
 * [세션 삭제 함수]
 * 쿠키 삭제
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
