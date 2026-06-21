import BoardPageJump from "./board-page-jump";
import BoardPagination from "./board-pagination";

interface BoardNavAreaProps {
  boardAbbr?: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
  basePath?: string;
}

const BoardNavArea = ({
  boardAbbr,
  currentPage,
  totalCount,
  pageSize,
  activeFilter,
  searchType,
  searchKeyword,
  basePath,
}: BoardNavAreaProps) => {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 sm:flex-row dark:border-zinc-800/60">
      {/* 1. 특정 페이지 바로가기 (Client Component) */}
      <BoardPageJump
        key={currentPage}
        boardAbbr={boardAbbr}
        currentPage={currentPage}
        totalPages={totalPages}
        activeFilter={activeFilter}
        searchType={searchType}
        searchKeyword={searchKeyword}
        basePath={basePath}
      />

      {/* 2. 다이내믹 페이지 번호 링크 */}
      <BoardPagination
        boardAbbr={boardAbbr}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        activeFilter={activeFilter}
        searchType={searchType}
        searchKeyword={searchKeyword}
        basePath={basePath}
      />
    </div>
  );
};

export default BoardNavArea;
