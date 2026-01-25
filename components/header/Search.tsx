"use client";

import { useState } from "react";

// Components
import SearchBoardModal from "./SearchBoardModal";

// Icons
import { SearchIcon } from "lucide-react";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
}

export default function Search({ allBoards }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="hidden md:flex items-center justify-center bg-neutral-100 px-2 py-1 rounded-lg gap-6 cursor-pointer hover:bg-neutral-200 transition-colors"
        onClick={() => setIsSearchOpen(true)}
      >
        <span className="text-neutral-400 text-[14px]">전체 게시판 검색</span>
        <SearchIcon size={20} className="text-neutral-600 p-0.5" />
      </button>

      <button type="button" className="md:hidden p-2 text-neutral-600">
        <SearchIcon size={20} onClick={() => setIsSearchOpen(true)} />
      </button>

      {isSearchOpen && (
        <SearchBoardModal
          allBoards={allBoards}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}
