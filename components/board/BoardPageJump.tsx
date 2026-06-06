"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface BoardPageJumpProps {
  boardAbbr: string;
  currentPage: number;
  totalPages: number;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

export default function BoardPageJump({
  boardAbbr,
  currentPage,
  totalPages,
  activeFilter,
  searchType,
  searchKeyword,
}: BoardPageJumpProps) {
  const router = useRouter();
  const [pageInput, setPageInput] = useState(String(currentPage));

  const handleJump = () => {
    const parsedPage = parseInt(pageInput, 10);
    if (isNaN(parsedPage)) {
      // Reset to current page if input is invalid
      setPageInput(String(currentPage));
      return;
    }

    // Clamp page number between 1 and totalPages
    const targetPage = Math.min(totalPages, Math.max(1, parsedPage));
    setPageInput(String(targetPage));

    const params = new URLSearchParams();
    if (activeFilter === "popular") {
      params.set("filter", "popular");
    }
    if (searchType && searchKeyword) {
      params.set("searchType", searchType);
      params.set("searchKeyword", searchKeyword);
    }
    params.set("page", String(targetPage));

    router.push(`/board/${boardAbbr}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJump();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-zinc-500 dark:text-zinc-400 font-medium">페이지 이동</span>
      <input
        type="number"
        min="1"
        max={totalPages}
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={String(currentPage)}
        className="w-16 px-2.5 py-1.5 text-center text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 transition-all font-medium"
      />
      <button
        onClick={handleJump}
        className="px-3 py-1.5 text-sm font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
      >
        이동
      </button>
    </div>
  );
}
