"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLoginUrl } from "@/hooks/use-login-url";
import { logout } from "@/lib/actions/logout";
import type { SessionUser } from "@/types/auth";
import { useSession } from "@/components/providers/session-provider";
import ThemeToggle from "@/components/ui/theme-toggle";

interface AuthenticatedNavProps {
  user: SessionUser;
}

const DEFAULT_LINKS = [
  {
    href: "/board",
    label: "전체 게시판",
  },
];

const UNAUTHENTICATED_LINKS = [
  {
    href: "/login",
    label: "로그인",
  },
  {
    href: "/signup",
    label: "회원가입",
  },
];

const NAV_LINK_CLASS =
  "hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400";

const AuthenticatedNav = ({ user }: AuthenticatedNavProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <>
      <Link
        href="/profile"
        className={`${NAV_LINK_CLASS} font-semibold text-zinc-900 dark:text-zinc-100`}
      >
        {user.nickname}
      </Link>
      <button
        onClick={handleLogout}
        className={`${NAV_LINK_CLASS} cursor-pointer focus:outline-none`}
      >
        로그아웃
      </button>
    </>
  );
};

const UnauthenticatedNav = () => {
  const loginUrl = useLoginUrl();

  return (
    <>
      {UNAUTHENTICATED_LINKS.map((link) => {
        const href = link.href === "/login" ? loginUrl : link.href;
        return (
          <Link key={link.href} href={href} className={NAV_LINK_CLASS}>
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

const DesktopNav = () => {
  const { user } = useSession();

  return (
    <nav className="hidden gap-6 md:flex md:items-center">
      {DEFAULT_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={NAV_LINK_CLASS}>
          {link.label}
        </Link>
      ))}
      {user ? <AuthenticatedNav user={user} /> : <UnauthenticatedNav />}
      <ThemeToggle />
    </nav>
  );
};

export default DesktopNav;
