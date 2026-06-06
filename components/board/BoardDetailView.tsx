"use client";

import type { Post } from "@/lib/queries/posts";
import type { Board } from "@/lib/queries/board";
import BoardButtonGroup from "./BoardButtonGroup";
import BoardDesktopTable from "./BoardDesktopTable";
import BoardMobileStack from "./BoardMobileStack";
import BoardPagination from "./BoardPagination";
import BoardSearchArea from "./BoardSearchArea";

interface BoardDetailViewProps {
  board: Board;
  posts: Post[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  activeFilter?: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

export default function BoardDetailView({
  board,
  posts,
  totalCount,
  currentPage,
  pageSize,
  activeFilter = "all",
  searchType,
  searchKeyword,
}: BoardDetailViewProps) {
  return (
    <div className="space-y-6">
      {/* Top Button Group */}
      <BoardButtonGroup
        boardAbbr={board.abbr}
        activeFilter={activeFilter}
        searchType={searchType}
        searchKeyword={searchKeyword}
      />

      {/* Posts List */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
        {/* Desktop Table View */}
        <BoardDesktopTable posts={posts} />

        {/* Mobile Stack View */}
        <BoardMobileStack posts={posts} />
      </div>

      {/* Bottom Button Group */}
      <BoardButtonGroup
        boardAbbr={board.abbr}
        activeFilter={activeFilter}
        searchType={searchType}
        searchKeyword={searchKeyword}
      />

      {/* Pagination & Search Area */}
      <div className="flex flex-col items-center gap-6 pt-4">
        {/* Pagination */}
        <BoardPagination
          boardAbbr={board.abbr}
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />

        {/* Jump to Page & Search bar wrapper */}
        <BoardSearchArea
          boardAbbr={board.abbr}
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

