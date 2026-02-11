"use client";

import { useState } from "react";
import Link from "next/link";

// Components
import EmptyList from "@/components/common/ui/EmptyUi";
import { ModalContainer, ModalLayout } from "@/components/layout/ModalLayout";

// Utils
import { normalize } from "@/libs/utils/format";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
  onClose: () => void;
}

interface ResultProps {
  searchInput: string;
  filteredBoards: BoardType[];
}

export default function SearchModal({ allBoards, onClose }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const filteredBoards = allBoards.filter((board) =>
    normalize(board.name).includes(normalize(searchInput)),
  );

  return (
    <ModalLayout onClose={onClose}>
      <ModalContainer className="flex flex-col gap-4">
        <Header value={searchInput} onChange={(v) => setSearchInput(v)} />
        <Result searchInput={searchInput} filteredBoards={filteredBoards} />
      </ModalContainer>
    </ModalLayout>
  );
}

const Header = ({
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

const Result = ({ searchInput, filteredBoards }: ResultProps) => {
  if (searchInput.length === 0)
    return <EmptyList text="검색어를 입력해주세요." height={120} />;
  if (filteredBoards.length === 0)
    return <EmptyList text="검색 결과가 없어요." height={120} />;

  return (
    <div className="flex flex-col gap-1">
      {filteredBoards.map((board) => (
        <ResultItem key={board.abbr} board={board} />
      ))}
    </div>
  );
};

const ResultItem = ({ board }: { board: BoardType }) => (
  <Link
    href={`/board/${board.abbr}`}
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
