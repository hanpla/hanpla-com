import Link from "next/link";

interface BoardPaginationProps {
  boardAbbr?: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
  basePath?: string;
}

export default function BoardPagination({
  boardAbbr,
  currentPage,
  totalCount,
  pageSize,
  activeFilter,
  searchType,
  searchKeyword,
  basePath,
}: BoardPaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // Generate page numbers, e.g. center on currentPage with window of 5 pages
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Adjust startPage if we are near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const getPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (activeFilter === "popular") {
      params.set("filter", "popular");
    }
    if (searchType && searchKeyword) {
      params.set("searchType", searchType);
      params.set("searchKeyword", searchKeyword);
    }
    params.set("page", String(pageNumber));
    const base = basePath || `/board/${boardAbbr}`;
    return `${base}?${params.toString()}`;
  };

  const activePageClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-semibold transition-colors cursor-pointer";
  const inactivePageClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer";
  const navBtnClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-medium transition-colors cursor-pointer";
  const navBtnDisabledClass =
    "px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800/40 text-zinc-300 dark:text-zinc-700 font-medium transition-colors cursor-default opacity-50";

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Prev Page Button */}
      {currentPage > 1 ? (
        <Link href={getPageLink(currentPage - 1)} className={navBtnClass} scroll={false}>
          &lt;
        </Link>
      ) : (
        <span className={navBtnDisabledClass}>&lt;</span>
      )}

      {/* Dynamic Page Numbers */}
      {pageNumbers.map((num) => (
        <Link
          key={num}
          href={getPageLink(num)}
          className={num === currentPage ? activePageClass : inactivePageClass}
          scroll={false}
        >
          {num}
        </Link>
      ))}

      {/* Next Page Button */}
      {currentPage < totalPages ? (
        <Link href={getPageLink(currentPage + 1)} className={navBtnClass} scroll={false}>
          &gt;
        </Link>
      ) : (
        <span className={navBtnDisabledClass}>&gt;</span>
      )}
    </div>
  );
}
