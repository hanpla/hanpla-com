import { Suspense } from "react";
import type { Metadata } from "next";

import { BoardList, BoardListSkeleton } from "@/components/all-board";

export const metadata: Metadata = {
  title: "게시판 목록 | hanpla-com",
  description: "다양한 주제의 게시판 목록을 확인하고 참여해보세요.",
};

const Header = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
        전체 게시판
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        관심 있는 주제의 게시판으로 이동하여 자유롭게 소통해보세요.
      </p>
    </div>
  );
};

const BoardPage = () => {
  return (
    <div className="space-y-8 py-6">
      <Header />

      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};

export default BoardPage;
