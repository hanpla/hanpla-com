import Link from "next/link";

import { Board } from "@/types/board";
import ChevronRightIcon from "@/components/icons/chevron-right-icon";

interface BoardCardProps {
  board: Board;
}

export const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <Link
      href={`/boards/${board.abbr}`}
      className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/65"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-100 dark:group-hover:text-white">
          {board.name}
        </h3>
        <span className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {board.abbr}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-end text-xs font-medium text-zinc-500 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200">
        <span>입장하기</span>
        <ChevronRightIcon className="ml-1 h-3.5 w-3.5 transform transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
};
