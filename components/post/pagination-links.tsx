import Pagination from "@/components/ui/pagination";

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
  return (
    <Pagination
      currentPage={currentPage}
      totalCount={totalCount}
      pageSize={pageSize}
      basePath={basePath}
      searchParams={searchParams}
    />
  );
};
