"use client";

import Link from "next/link";

// Hooks
import { useRecentBoards } from "@/libs/hooks/useRecentBoards";

// Components
import PageLayout from "../layout/PageLayout";

// Icons
import { X } from "lucide-react";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
}

export default function RecentBoard({ allBoards }: Props) {
  const { recentBoards, removeRecentBoard } = useRecentBoards(allBoards);

  return (
    <PageLayout>
      <Layout>
        <Label>최근 방문</Label>
        <Cards
          recentBoards={recentBoards}
          removeRecentBoard={removeRecentBoard}
        />
      </Layout>
    </PageLayout>
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

const Cards = ({
  recentBoards,
  removeRecentBoard,
}: {
  recentBoards: BoardType[];
  removeRecentBoard: (abbr: string) => void;
}) => {
  return (
    <>
      {recentBoards.map((board) => (
        <Card
          key={board.abbr}
          board={board}
          removeRecentBoard={removeRecentBoard}
        />
      ))}
    </>
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
      <CardLink board={board} />
      <DeleteBtn abbr={board.abbr} onClick={removeRecentBoard} />
    </div>
  );
};

const CardLink = ({ board }: { board: BoardType }) => {
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
