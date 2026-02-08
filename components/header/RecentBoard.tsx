"use client";

import Link from "next/link";

// Hooks
import { useRecentBoards } from "@/libs/hooks/useRecentBoard";

// Types
import { BoardType } from "@/libs/types/board";
import { X } from "lucide-react";

interface Props {
  allBoards: BoardType[];
}

export default function RecentBoard({ allBoards }: Props) {
  const { recentBoards, removeRecentBoard } = useRecentBoards(allBoards);

  return (
    <Layout>
      <Label>최근 방문</Label>
      {recentBoards.map((board) => (
        <Card
          key={board.abbr}
          board={board}
          removeRecentBoard={removeRecentBoard}
        />
      ))}
    </Layout>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap py-1 no-scrollbar min-h-9.75">
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

const Card = ({
  board,
  removeRecentBoard,
}: {
  board: BoardType;
  removeRecentBoard: (abbr: string) => void;
}) => {
  return (
    <div className="flex items-center text-xs text-neutral-500 bg-neutral-100 hover:text-neutral-800 px-2.5 py-1 rounded-full hover:bg-neutral-200 transition-all active:scale-95">
      <Item board={board} />
      <DeleteBtn abbr={board.abbr} onClick={removeRecentBoard} />
    </div>
  );
};

const Item = ({ board }: { board: BoardType }) => {
  return (
    <Link href={`/board/${board.abbr}`} className="p-0.5 hover:font-medium">
      {board.name}
    </Link>
  );
};

const DeleteBtn = ({
  abbr,
  onClick,
}: {
  abbr: string;
  onClick: (abbr: string) => void;
}) => {
  return (
    <button className="p-1 hover:text-red-600" onClick={() => onClick(abbr)}>
      <X size={12} />
    </button>
  );
};
