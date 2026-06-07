import Link from "next/link";
import type { Board } from "@/lib/queries/board";

interface BoardHeaderProps {
  board?: Board;
  title?: string;
  description?: string;
}

export default function BoardHeader({ board, title, description }: BoardHeaderProps) {
  const headerTitle = title || (board ? `${board.name} 게시판` : "");
  const headerDesc = description || (board ? `${board.name} 주제에 관해 자유롭게 소통하는 공간입니다.` : "");
  const headerHref = board ? `/board/${board.abbr}` : "/best";

  return (
    <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        <Link href={headerHref} className="hover:underline">
          {headerTitle}
        </Link>
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {headerDesc}
      </p>
    </div>
  );
}
