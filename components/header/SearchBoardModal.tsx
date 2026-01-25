"use client";

import Link from "next/link";
import { useState } from "react";

// Components
import EmptyList from "../common/EmptyList";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  onClose: () => void;
  allBoards: BoardType[];
}

export default function SearchBoardModal({ onClose, allBoards }: Props) {
  const [searchInput, setSearchInput] = useState("");

  const filteredBoards = allBoards.filter((board) => {
    const normalize = (text: string) => text.split(" ").join("").toLowerCase();
    return normalize(board.name).includes(normalize(searchInput));
  });

  return (
    <div
      className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 md:pt-40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">게시판 검색</h2>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            autoFocus
            type="text"
            placeholder="게시판 이름을 입력해주세요."
            className="w-full p-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-neutral-400 transition-all"
          />

          <div className="max-h-60 overflow-y-auto">
            <SearchResults
              searchInput={searchInput}
              filteredBoards={filteredBoards}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchResults({
  searchInput,
  filteredBoards,
  onClose,
}: {
  searchInput: string;
  filteredBoards: BoardType[];
  onClose: () => void;
}) {
  // 조건 1: 검색어가 없을 때
  if (searchInput.length === 0) {
    return <EmptyList text="검색어를 입력해주세요." height={120} />;
  }

  // 조건 2: 검색 결과가 없을 때
  if (filteredBoards.length === 0) {
    return <EmptyList text="검색 결과가 없어요." height={120} />;
  }

  // 조건 3: 검색 결과가 있을 때
  return (
    <div className="flex flex-col gap-1">
      {filteredBoards.map((board) => (
        <Link
          key={board.abbr}
          href={`/board/${board.abbr}`}
          onClick={onClose}
          className="p-3 hover:bg-neutral-50 rounded-lg flex justify-between items-center group transition-colors"
        >
          <span className="font-medium text-neutral-700 group-hover:text-black">
            {board.name}
          </span>
          <span className="text-xs text-neutral-400 group-hover:text-neutral-600">
            {board.abbr}
          </span>
        </Link>
      ))}
    </div>
  );
}
