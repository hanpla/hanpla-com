"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoggedOutLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const redirectPath =
    pathname === "/login" || pathname === "/signup" ? "/" : fullPath;

  const AUTH_LINKS = [
    { label: "전체 게시판", href: "/board" },
    { label: "로그인", href: `/login?callbackUrl=${redirectPath}` },
    { label: "회원가입", href: "/signup" },
  ];
  return (
    <div className="hidden md:flex items-center gap-4">
      {AUTH_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-neutral-800"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
