import Link from "next/link";
import { usePagination } from "@/hooks/use-pagination";

interface PaginationLinksProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export const PaginationLinks = ({
  currentPage,
  totalCount,
  pageSize,
  basePath,
  searchParams,
}: PaginationLinksProps) => {
  const { pageNumbers, getPageLink, isFirstPage, isLastPage } = usePagination({
    currentPage,
    totalCount,
    pageSize,
    basePath,
    searchParams,
  });

  const activePageClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-semibold cursor-pointer";
  const inactivePageClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium cursor-pointer";
  const navBtnClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium cursor-pointer";
  const navBtnDisabledClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 font-medium cursor-default opacity-50";

  return (
    <div className="flex items-center justify-center gap-1">
      {!isFirstPage ? (
        <Link href={getPageLink(currentPage - 1)} className={navBtnClass} scroll={false}>
          &lt;
        </Link>
      ) : (
        <span className={navBtnDisabledClass}>&lt;</span>
      )}

      {pageNumbers.map((num) => (
        <Link
          key={num}
          href={getPageLink(num)}
          className={num === currentPage ? activePageClass : inactivePageClass}
        >
          {num}
        </Link>
      ))}

      {!isLastPage ? (
        <Link href={getPageLink(currentPage + 1)} className={navBtnClass} scroll={false}>
          &gt;
        </Link>
      ) : (
        <span className={navBtnDisabledClass}>&gt;</span>
      )}
    </div>
  );
};
