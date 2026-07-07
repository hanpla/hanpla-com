import { PageJump } from "./page-jump";
import { PaginationLinks } from "./pagination-links";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  basePath,
  searchParams,
}: PaginationProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 sm:flex-row dark:border-zinc-800/60">
      <PageJump
        key={currentPage}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        basePath={basePath}
        searchParams={searchParams}
      />
      <PaginationLinks
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        basePath={basePath}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Pagination;
