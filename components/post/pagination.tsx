"use client";

interface PaginationProps {
  baseUrl: string;
  totalCount: number;
  currentPage: number;
  pageSize?: number;
}

export const Pagination = ({ baseUrl, totalCount, currentPage, pageSize = 20 }: PaginationProps) => {
  return (
    <div className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/20">
      [페이지네이션 플레이스홀더 (BaseURL: {baseUrl}, CurrentPage: {currentPage}, TotalCount: {totalCount}, PageSize: {pageSize})]
    </div>
  );
};
