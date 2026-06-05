import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface DesktopNavProps {
  loginUrl: string;
}

export default function DesktopNav({ loginUrl }: DesktopNavProps) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <Link
        href="/board"
        className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
      >
        전체 게시판
      </Link>
      <Link
        href={loginUrl}
        className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
      >
        로그인
      </Link>
      <Link
        href="/signup"
        className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
      >
        회원가입
      </Link>
      <div className="flex h-5 items-center border-l border-zinc-200 pl-4 dark:border-zinc-800">
        <ThemeToggle />
      </div>
    </nav>
  );
}
