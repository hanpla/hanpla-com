import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // 1. 세션 유효성 검증 함수 (미들웨어 내부용)
  const verify = async () => {
    if (!token) return false;
    try {
      await jwtVerify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  };

  const isAuthenticated = await verify();

  // 2. 보호된 경로(/profile) 접근 제어
  if (!isAuthenticated && pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. 로그인 상태에서 로그인 페이지(/login) 접근 시 인덱스 페이지로 이동
  const authPages = ["/login", "/signup"];
  if (isAuthenticated && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login"],
};
