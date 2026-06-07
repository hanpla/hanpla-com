import BoardPageJump from "./BoardPageJump";
import BoardSearchBar from "./BoardSearchBar";

interface BoardSearchAreaProps {
  boardAbbr?: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
  basePath?: string;
}

export default function BoardSearchArea({
  boardAbbr,
  currentPage,
  totalCount,
  pageSize,
  activeFilter,
  searchType = "title",
  searchKeyword = "",
  basePath,
}: BoardSearchAreaProps) {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-6 sm:flex-row dark:border-zinc-800/60">
      {/* Page Jump Component */}
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

      {/* Dynamic Search Bar Component */}
      <BoardSearchBar
        key={`${searchKeyword}_${searchType}`} // Reset search inputs on URL state change
        boardAbbr={boardAbbr}
        initialSearchType={searchType}
        initialSearchKeyword={searchKeyword}
        activeFilter={activeFilter}
        basePath={basePath}
      />
    </div>
  );
}
