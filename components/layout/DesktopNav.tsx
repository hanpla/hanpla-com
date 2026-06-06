"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { logout } from "@/lib/actions/logout";
import type { SessionUser } from "@/lib/auth";

const NAV_LINK_CLASS =
  "hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400";

interface DesktopNavProps {
  loginUrl: string;
  user: SessionUser | null;
}

// 로그인 상태일 때 표시할 컴포넌트
function AuthenticatedNav({ user, onLogout }: { user: SessionUser; onLogout: () => void }) {
  return (
    <>
      <Link href="/profile" className={`${NAV_LINK_CLASS} flex items-center gap-1`}>
        <span className="max-w-[120px] truncate font-semibold text-zinc-900 dark:text-zinc-100">
          {user.nickname}
        </span>
        <span>님</span>
      </Link>
      <button
        onClick={onLogout}
        className={`${NAV_LINK_CLASS} cursor-pointer focus:outline-none`}
      >
        로그아웃
      </button>
    </>
  );
}

// 비로그인 상태일 때 표시할 컴포넌트
function UnauthenticatedNav({ loginUrl }: { loginUrl: string }) {
  return (
    <>
      <Link href={loginUrl} className={NAV_LINK_CLASS}>
        로그인
      </Link>
      <Link href="/signup" className={NAV_LINK_CLASS}>
        회원가입
      </Link>
    </>
  );
}

export default function DesktopNav({ loginUrl, user }: DesktopNavProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <nav className="hidden items-center gap-6 md:flex">
      <Link href="/board" className={NAV_LINK_CLASS}>
        전체 게시판
      </Link>
      {user ? (
        <AuthenticatedNav user={user} onLogout={handleLogout} />
      ) : (
        <UnauthenticatedNav loginUrl={loginUrl} />
      )}
      <div className="flex h-5 items-center border-l border-zinc-200 pl-4 dark:border-zinc-800">
        <ThemeToggle />
      </div>
    </nav>
  );
}
