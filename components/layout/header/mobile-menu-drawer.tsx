"use client";

import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";

import CloseIcon from "@/components/icons/CloseIcon";
import Logo from "@/components/ui/logo";
import { logout } from "@/lib/actions/logout";
import { useMount } from "@/hooks/useMount";
import { useUserStore } from "@/components/providers/user-store-provider";
import type { SessionUser } from "@/lib/utils/auth";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  closeMenu: () => void;
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

const LINK_CLASS =
  "hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400";

const MobileAuthenticatedMenu = ({ user, closeMenu }: MobileAuthenticatedMenuProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    closeMenu();
    router.refresh();
  };

  return (
    <>
      <Link
        href="/profile"
        onClick={closeMenu}
        className={`${LINK_CLASS} font-semibold text-zinc-900 dark:text-zinc-100`}
      >
        {user.nickname} (프로필)
      </Link>
      <button
        onClick={handleLogout}
        className={`${LINK_CLASS} text-left cursor-pointer focus:outline-none`}
      >
        로그아웃
      </button>
    </>
  );
};

const MobileUnauthenticatedMenu = ({ closeMenu }: MobileUnauthenticatedMenuProps) => (
  <>
    {UNAUTHENTICATED_LINKS.map((link) => (
      <Link key={link.href} href={link.href} onClick={closeMenu} className={LINK_CLASS}>
        {link.label}
      </Link>
    ))}
  </>
);

const MobileMenuDrawer = ({ isOpen, closeMenu }: MobileMenuDrawerProps) => {
  const isMounted = useMount();
  const user = useUserStore((state) => state.user);

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`bg-background fixed top-0 right-0 z-50 flex h-full w-72 transform flex-col border-l border-zinc-200 shadow-2xl transition-all duration-300 ease-in-out md:hidden dark:border-zinc-800/85 ${
          isOpen ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
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
      </div>
    </>,
    document.body
  );
};

export default MobileMenuDrawer;



