"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CloseIcon from "@/components/icons/CloseIcon";
import Logo from "./Logo";
import { logout } from "@/lib/actions/logout";
import type { SessionUser } from "@/lib/utils/auth";

const LINK_CLASS =
  "hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400";

interface MobileNavDrawerProps {
  loginUrl: string;
  isOpen: boolean;
  closeMenu: () => void;
  user: SessionUser | null;
}

// 로그인 상태의 모바일 메뉴 컴포넌트
interface AuthenticatedMobileNavProps {
  user: SessionUser;
  onClose: () => void;
  onLogout: () => void;
}

function AuthenticatedMobileNav({ user, onClose, onLogout }: AuthenticatedMobileNavProps) {
  return (
    <>
      <Link href="/profile" onClick={onClose} className={`${LINK_CLASS} flex items-center gap-1`}>
        <span className="max-w-[140px] truncate font-semibold text-zinc-900 dark:text-zinc-100">
          {user.nickname}
        </span>
        <span>님</span>
      </Link>
      <button
        onClick={onLogout}
        className={`${LINK_CLASS} cursor-pointer text-left focus:outline-none`}
      >
        로그아웃
      </button>
    </>
  );
}

// 비로그인 상태의 모바일 메뉴 컴포넌트
interface UnauthenticatedMobileNavProps {
  loginUrl: string;
  onClose: () => void;
}

function UnauthenticatedMobileNav({ loginUrl, onClose }: UnauthenticatedMobileNavProps) {
  return (
    <>
      <Link href={loginUrl} onClick={onClose} className={LINK_CLASS}>
        로그인
      </Link>
      <Link href="/signup" onClick={onClose} className={LINK_CLASS}>
        회원가입
      </Link>
    </>
  );
}

export default function MobileNavDrawer({
  loginUrl,
  isOpen,
  closeMenu,
  user,
}: MobileNavDrawerProps) {
  const router = useRouter();

  const handleLogout = async () => {
    closeMenu();
    await logout();
    router.refresh();
  };

  return (
    <>
      {/* Backdrop for Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Drawer Container */}
      <div
        className={`bg-background fixed top-0 right-0 z-50 flex h-full w-72 transform flex-col border-l border-zinc-200 shadow-2xl transition-all duration-300 ease-in-out md:hidden dark:border-zinc-800/85 ${
          isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800/80">
          <Logo />
          <button
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground cursor-pointer rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-1 flex-col gap-5 px-6 py-8">
          <Link href="/board" onClick={closeMenu} className={LINK_CLASS}>
            전체 게시판
          </Link>
          {user ? (
            <AuthenticatedMobileNav user={user} onClose={closeMenu} onLogout={handleLogout} />
          ) : (
            <UnauthenticatedMobileNav loginUrl={loginUrl} onClose={closeMenu} />
          )}
        </nav>
      </div>
    </>
  );
}
