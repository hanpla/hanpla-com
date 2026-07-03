"use client";

import { createPortal } from "react-dom";
import Link from "next/link";

import { useMount } from "@/hooks/use-mount";
import { useLoginCallback } from "@/hooks/use-login-callback";
import type { SessionUser } from "@/types/auth";
import CloseIcon from "@/components/icons/close-icon";
import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import LogoutButton from "./logout-button";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  closeMenu: () => void;
  user: SessionUser | null;
}

interface MobileAuthenticatedMenuProps {
  user: SessionUser;
  closeMenu: () => void;
}

interface MobileUnauthenticatedMenuProps {
  closeMenu: () => void;
}

const DEFAULT_LINKS = [
  {
    href: "/boards",
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

const LINK_CLASS =
  "hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400";

const MobileAuthenticatedMenu = ({ user, closeMenu }: MobileAuthenticatedMenuProps) => {
  return (
    <>
      <Link
        href="/profile"
        onClick={closeMenu}
        className={`${LINK_CLASS} font-semibold text-zinc-900 dark:text-zinc-100`}
      >
        @{user.nickname}
      </Link>
      <LogoutButton
        className={`${LINK_CLASS} cursor-pointer text-left focus:outline-none`}
        onLogoutSuccess={closeMenu}
      />
    </>
  );
};

const MobileUnauthenticatedMenu = ({ closeMenu }: MobileUnauthenticatedMenuProps) => {
  const loginUrl = useLoginCallback();

  return (
    <>
      {UNAUTHENTICATED_LINKS.map((link) => {
        const href = link.href === "/login" ? loginUrl : link.href;
        return (
          <Link key={link.href} href={href} onClick={closeMenu} className={LINK_CLASS}>
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

const MobileMenuDrawer = ({ isOpen, closeMenu, user }: MobileMenuDrawerProps) => {
  const isMounted = useMount();

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-all duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 max-w-[85vw] transform flex-col border-l border-zinc-200 bg-white shadow-2xl transition-all duration-300 ease-in-out md:hidden dark:border-zinc-800 dark:bg-zinc-950 ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* Header */}
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

        {/* Navigation body */}
        <nav className="flex flex-1 flex-col gap-5 px-6 py-8">
          {DEFAULT_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu} className={LINK_CLASS}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <MobileAuthenticatedMenu user={user} closeMenu={closeMenu} />
          ) : (
            <MobileUnauthenticatedMenu closeMenu={closeMenu} />
          )}
        </nav>

        {/* Footer (Theme Toggle) */}
        <div className="flex items-center justify-between border-t border-zinc-200 px-6 py-6 dark:border-zinc-800/80">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">화면 테마</span>
          <ThemeToggle />
        </div>
      </div>
    </>,
    document.body
  );
};

export default MobileMenuDrawer;
