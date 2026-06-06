import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// 인증 완료된 사용자는 접근할 수 없는 경로 (로그인, 회원가입 등)
const AUTH_ROUTES = ["/login", "/signup"];

// 로그인이 반드시 필요한 보호된 경로 접두사 (프로필 등)
const PROTECTED_ROUTE_PREFIXES = ["/profile"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("session_token")?.value;

  let isLoggedIn = false;
  if (token) {
    const jwtSecret = process.env.JWT_SECRET;
    if (jwtSecret) {
      try {
        const secret = new TextEncoder().encode(jwtSecret);
        await jose.jwtVerify(token, secret);
        isLoggedIn = true;
      } catch {
        // JWT 만료 또는 유효하지 않음
      }
    }
  }

  // 1. 로그인 상태인 유저가 로그인/회원가입 페이지에 접근 시 메인(/)으로 이동
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. 비로그인 상태인 유저가 보호된 경로에 접근 시 로그인(/login?callbackUrl=...)으로 이동
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login", "/signup"],
};
