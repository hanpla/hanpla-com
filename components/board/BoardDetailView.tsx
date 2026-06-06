

import type { Post } from "@/lib/queries/posts";
import BoardButtonGroup from "./BoardButtonGroup";
import BoardDesktopTable from "./BoardDesktopTable";
import BoardMobileStack from "./BoardMobileStack";
import BoardPagination from "./BoardPagination";
import BoardSearchArea from "./BoardSearchArea";

interface BoardDetailViewProps {
  boardAbbr: string;
  posts: Post[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  activeFilter?: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

export default function BoardDetailView({
  boardAbbr,
  posts,
  totalCount,
  currentPage,
  pageSize,
  activeFilter = "all",
  searchType,
  searchKeyword,
}: BoardDetailViewProps) {
  const currentSearchParams = {
    filter: activeFilter,
    page: String(currentPage),
    searchType,
    searchKeyword,
  };

  return (
    <div className="space-y-6">
      {/* Top Button Group */}
      <BoardButtonGroup boardAbbr={boardAbbr} activeFilter={activeFilter} />

      {/* Posts List */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
        {/* Desktop Table View */}
        <BoardDesktopTable posts={posts} searchParams={currentSearchParams} />

        {/* Mobile Stack View */}
        <BoardMobileStack posts={posts} searchParams={currentSearchParams} />
      </div>

      {/* Bottom Button Group */}
      <BoardButtonGroup boardAbbr={boardAbbr} activeFilter={activeFilter} />

      {/* Pagination & Search Area */}
      <div className="flex flex-col items-center gap-6 pt-4">
        {/* Pagination */}
        <BoardPagination
          boardAbbr={boardAbbr}
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />

        {/* Jump to Page & Search bar wrapper */}
        <BoardSearchArea
          boardAbbr={boardAbbr}
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />
      </div>
    </div>
  );
}

