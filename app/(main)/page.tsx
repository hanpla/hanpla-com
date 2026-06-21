import { Suspense } from "react";
import type { Metadata } from "next";

import BoardHeaderUI from "@/components/board/header-ui";
import BestPostSection from "@/components/board/best-post-section";
import type { BoardSearchParams } from "@/components/board";

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "인기 게시글들을 모아보는 공간입니다.",
};

interface HomeProps {
  searchParams: BoardSearchParams;
}

const Home = ({ searchParams }: HomeProps) => {
  return (
    <div className="space-y-6 py-6">
      <BoardHeaderUI name="인기 게시판" abbr="best" desc="인기 게시글들을 모아보는 공간입니다." />
      
      {/* 인기글 목록 & 페이징 & 검색 영역 (지연 스트리밍 타겟) */}
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900/30" />
        }
      >
        <BestPostSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home;
