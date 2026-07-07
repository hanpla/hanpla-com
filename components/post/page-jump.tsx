"use client";

import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/use-pagination";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

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
      <div className="w-16">
        <Input
          type="number"
          min="1"
          max={totalPages}
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={String(currentPage)}
          className="px-2.5! py-1.5! text-center! text-sm!"
        />
      </div>
      <Button variant="secondary" size="sm" onClick={handleJump}>
        이동
      </Button>
    </div>
  );
};
