import Link from "next/link";
import CloseIcon from "@/components/icons/CloseIcon";

interface MobileNavDrawerProps {
  loginUrl: string;
  isOpen: boolean;
  closeMenu: () => void;
}

export default function MobileNavDrawer({ loginUrl, isOpen, closeMenu }: MobileNavDrawerProps) {
  return (
    <>
      {/* Backdrop for Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Drawer Container */}
      <div
        className={`bg-background fixed top-0 right-0 z-50 flex h-full w-72 transform flex-col border-l border-zinc-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden dark:border-zinc-800/85 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800/80">
          <Link
            href="/"
            className="text-foreground text-xl font-bold tracking-tight"
            onClick={closeMenu}
          >
            Hanpla
          </Link>
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
          <Link
            href="/board"
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            전체 게시판
          </Link>
          <Link
            href={loginUrl}
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </>
  );
}
