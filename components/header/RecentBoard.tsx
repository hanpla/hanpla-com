"use client";

import Link from "next/link";

// Hooks
import { useRecentBoards } from "@/libs/hooks/useRecentBoard";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
}

export default function RecentBoard({ allBoards }: Props) {
  const { recentBoards } = useRecentBoards(allBoards);

  return (
    <Layout>
      <Label>최근 방문</Label>
      {recentBoards.map((board) => (
        <Item key={board.abbr} board={board} />
      ))}
    </Layout>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1 no-scrollbar">
      {children}
    </div>
  );
};

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-xs font-bold text-neutral-400 mr-2 shrink-0">
      {children}
    </span>
  );
};

const Item = ({ board }: { board: BoardType }) => {
  return (
    <Link
      href={`/board/${board.abbr}`}
      className="text-xs text-neutral-500 bg-neutral-100 hover:text-neutral-800 px-2.5 py-1 rounded-full hover:bg-neutral-200 transition-all active:scale-95"
    >
      {board.name}
    </Link>
  );
};
