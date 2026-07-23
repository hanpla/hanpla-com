"use client";

import Link from "next/link";
import { usePagination } from "@/hooks/use-pagination";

export interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  basePath?: string;
  searchParams?: Record<string, string | undefined>;
  onPageChange?: (page: number) => void;
  className?: string;
}

const ACTIVE_PAGE_CLASS =
  "px-3.5 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-semibold cursor-pointer transition-colors";
const INACTIVE_PAGE_CLASS =
  "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium cursor-pointer transition-colors";
const NAV_BTN_CLASS =
  "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium cursor-pointer transition-colors";
const NAV_BTN_DISABLED_CLASS =
  "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 font-medium cursor-default opacity-50";

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  basePath,
  searchParams,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const { totalPages, pageNumbers, getPageLink, isFirstPage, isLastPage } = usePagination({
    currentPage,
    totalCount,
    pageSize,
    basePath,
    searchParams,
  });

  if (totalPages <= 1) {
    return null;
  }

  const renderPrevButton = () => {
    if (isFirstPage) {
      return <span className={NAV_BTN_DISABLED_CLASS}>&lt;</span>;
    }

    const prevPage = currentPage - 1;
    if (onPageChange) {
      return (
        <button type="button" onClick={() => onPageChange(prevPage)} className={NAV_BTN_CLASS}>
          &lt;
        </button>
      );
    }

    return (
      <Link href={getPageLink(prevPage)} className={NAV_BTN_CLASS} scroll={false}>
        &lt;
      </Link>
    );
  };

  const renderNextButton = () => {
    if (isLastPage) {
      return <span className={NAV_BTN_DISABLED_CLASS}>&gt;</span>;
    }

    const nextPage = currentPage + 1;
    if (onPageChange) {
      return (
        <button type="button" onClick={() => onPageChange(nextPage)} className={NAV_BTN_CLASS}>
          &gt;
        </button>
      );
    }

    return (
      <Link href={getPageLink(nextPage)} className={NAV_BTN_CLASS} scroll={false}>
        &gt;
      </Link>
    );
  };

  const renderPageItem = (num: number) => {
    const isActive = num === currentPage;
    const itemClass = isActive ? ACTIVE_PAGE_CLASS : INACTIVE_PAGE_CLASS;

    if (onPageChange) {
      return (
        <button key={num} type="button" onClick={() => onPageChange(num)} className={itemClass}>
          {num}
        </button>
      );
    }

    return (
      <Link key={num} href={getPageLink(num)} className={itemClass}>
        {num}
      </Link>
    );
  };

  return (
    <div className={`flex items-center justify-center gap-1 ${className}`}>
      {renderPrevButton()}
      {pageNumbers.map(renderPageItem)}
      {renderNextButton()}
    </div>
  );
};

export default Pagination;
