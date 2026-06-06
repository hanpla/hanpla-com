"use client";

import type { MockPost } from "@/lib/mocks/posts";
import type { Board } from "@/lib/queries/board";
import BoardButtonGroup from "./BoardButtonGroup";
import BoardDesktopTable from "./BoardDesktopTable";
import BoardMobileStack from "./BoardMobileStack";
import BoardPagination from "./BoardPagination";
import BoardSearchArea from "./BoardSearchArea";

interface BoardDetailViewProps {
  board: Board;
  posts: MockPost[];
}

export default function BoardDetailView({ board, posts }: BoardDetailViewProps) {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {board.name} 게시판
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {board.name} 주제에 관해 자유롭게 소통하는 공간입니다.
          </p>
        </div>

        {/* Top Button Group */}
        <BoardButtonGroup />

        {/* Posts List */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
          {/* Desktop Table View */}
          <BoardDesktopTable posts={posts} />

          {/* Mobile Stack View */}
          <BoardMobileStack posts={posts} />
        </div>

        {/* Bottom Button Group */}
        <BoardButtonGroup />

        {/* Pagination & Search Area */}
        <div className="flex flex-col items-center gap-6 pt-4">
          {/* Pagination */}
          <BoardPagination />

          {/* Jump to Page & Search bar wrapper */}
          <BoardSearchArea />
        </div>
      </div>
    </div>
  );
}
