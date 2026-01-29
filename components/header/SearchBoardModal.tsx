"use client";

import { useState } from "react";
import Link from "next/link";

// Utils
import { normalize } from "@/libs/utils/utils";

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

  // 필터링
  const filteredBoards = allBoards.filter((board) =>
    normalize(board.name).includes(normalize(searchInput)),
  );

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // 1. 모달 레이아웃 (틀)
    <ModalLayout onClose={onClose}>
      <ModalContainer onClick={handleContainerClick}>
        <div className="flex flex-col gap-4">
          {/* 2. 입력 섹션 */}
          <SearchHeader
            value={searchInput}
            onChange={(v) => setSearchInput(v)}
          />

          {/* 3. 결과 섹션 */}
          <div className="max-h-60 overflow-y-auto">
            <SearchResults
              searchInput={searchInput}
              filteredBoards={filteredBoards}
              onClose={onClose}
            />
          </div>
        </div>
      </ModalContainer>
    </ModalLayout>
  );
}

const ModalLayout = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm flex justify-center items-start pt-20 md:pt-40"
      onClick={onClose}
    >
      {children}
    </div>
  );
};

const ModalContainer = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <div
      className="w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const SearchHeader = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <>
    <h2 className="text-lg font-bold">게시판 검색</h2>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
      type="text"
      placeholder="게시판 이름을 입력해주세요."
      className="w-full p-3 bg-neutral-100 rounded-xl outline-none focus:ring-2 focus:ring-neutral-400 transition-all"
    />
  </>
);

const SearchResults = ({
  searchInput,
  filteredBoards,
  onClose,
}: {
  searchInput: string;
  filteredBoards: BoardType[];
  onClose: () => void;
}) => {
  if (searchInput.length === 0)
    return <EmptyList text="검색어를 입력해주세요." height={120} />;
  if (filteredBoards.length === 0)
    return <EmptyList text="검색 결과가 없어요." height={120} />;

  return (
    <div className="flex flex-col gap-1">
      {filteredBoards.map((board) => (
        <SearchResultItem key={board.abbr} board={board} onClick={onClose} />
      ))}
    </div>
  );
};

const SearchResultItem = ({
  board,
  onClick,
}: {
  board: BoardType;
  onClick: () => void;
}) => (
  <Link
    href={`/board/${board.abbr}`}
    onClick={onClick}
    className="p-3 hover:bg-neutral-50 rounded-lg flex justify-between items-center group transition-colors"
  >
    <span className="font-medium text-neutral-700 group-hover:text-black">
      {board.name}
    </span>
    <span className="text-xs text-neutral-400 group-hover:text-neutral-600">
      {board.abbr}
    </span>
  </Link>
);
