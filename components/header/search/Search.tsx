"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Components
import SearchModal from "./SearchModal";

// Icons
import { SearchIcon } from "lucide-react";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
}

interface BtnProps {
  onClick: () => void;
}

export default function Search({ allBoards }: Props) {
  const pathName = usePathname();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const openSearch = () => setIsSearchModalOpen(true);
  const closeSearch = () => setIsSearchModalOpen(false);

  useEffect(() => {
    closeSearch();
  }, [pathName]);

  return (
    <>
      <MobileSearhBtn onClick={openSearch} />
      <DesktopSearchBtn onClick={openSearch} />

      {isSearchModalOpen && (
        <SearchModal onClose={closeSearch} allBoards={allBoards} />
      )}
    </>
  );
}

const MobileSearhBtn = ({ onClick }: BtnProps) => {
  return (
    <button className="md:hidden p-2 text-neutral-600" onClick={onClick}>
      <SearchIcon size={20} />
    </button>
  );
};

const DesktopSearchBtn = ({ onClick }: BtnProps) => {
  return (
    <button
      className="hidden md:flex bg-neutral-100 px-2 py-1 rounded-lg gap-6 cursor-pointer hover:bg-neutral-200 transition-colors"
      onClick={onClick}
    >
      <span className="text-neutral-400 text-[14px]">전체 게시판 검색</span>
      <SearchIcon size={20} className="text-neutral-600 p-0.5" />
    </button>
  );
};
