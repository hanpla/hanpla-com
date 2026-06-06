import SearchIcon from "@/components/icons/SearchIcon";
import BoardPageJump from "./BoardPageJump";

interface BoardSearchAreaProps {
  boardAbbr: string;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  activeFilter: "all" | "popular";
}

export default function BoardSearchArea({
  boardAbbr,
  currentPage,
  totalCount,
  pageSize,
  activeFilter,
}: BoardSearchAreaProps) {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-800/60">
      
      {/* Page Jump Component */}
      <BoardPageJump
        key={currentPage}
        boardAbbr={boardAbbr}
        currentPage={currentPage}
        totalPages={totalPages}
        activeFilter={activeFilter}
      />

      {/* Search Bar */}
      <div className="flex items-center gap-1.5 w-full sm:w-auto">
        <select className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 transition-all cursor-pointer">
          <option value="all">전체</option>
          <option value="title_content">제목 + 내용</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="author">글쓴이</option>
        </select>
        <div className="relative flex-1 sm:flex-initial">
          <input
            type="text"
            placeholder="검색어 입력..."
            className="w-full sm:w-48 px-3 py-2 pr-8 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 transition-all"
          />
        </div>
        <button className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer">
          <SearchIcon className="h-3.5 w-3.5" />
          검색
        </button>
      </div>

    </div>
  );
}
