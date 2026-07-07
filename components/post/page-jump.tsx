"use client";

import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/use-pagination";

interface PageJumpProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export const PageJump = ({
  currentPage,
  totalCount,
  pageSize,
  basePath,
  searchParams,
}: PageJumpProps) => {
  const router = useRouter();
  const [pageInput, setPageInput] = useState(String(currentPage));

  const { totalPages, getPageLink } = usePagination({
    currentPage,
    totalCount,
    pageSize,
    basePath,
    searchParams,
  });

  const handleJump = () => {
    const parsedPage = parseInt(pageInput, 10);
    if (isNaN(parsedPage)) {
      setPageInput(String(currentPage));
      return;
    }

    const targetPage = Math.min(totalPages, Math.max(1, parsedPage));
    setPageInput(String(targetPage));
    router.push(getPageLink(targetPage), { scroll: false });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJump();
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-medium text-zinc-500 dark:text-zinc-400">페이지 이동</span>
      <input
        type="number"
        min="1"
        max={totalPages}
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={String(currentPage)}
        className="w-16 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-center text-sm font-medium focus:outline-1 dark:border-zinc-800 dark:focus:outline-zinc-500"
      />
      <button
        onClick={handleJump}
        className="cursor-pointer rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      >
        이동
      </button>
    </div>
  );
};
