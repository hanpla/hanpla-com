import { Suspense } from "react";
import type { Metadata } from "next";

import BoardHeaderUI from "@/components/board/header-ui";
import BestPostSection from "@/components/board/best-post-section";
import BoardPostSectionSkeleton from "@/components/board/board-post-section-skeleton";
import BoardSearchBar from "@/components/board/board-search-bar";
import BoardSearchBarSkeleton from "@/components/board/board-search-bar-skeleton";
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
    <>
      <BoardHeaderUI name="인기 게시판" abbr="best" />

      {/* 인기글 목록 & 페이징 영역 (지연 스트리밍 타겟) */}
      <Suspense fallback={<BoardPostSectionSkeleton showFilter={false} />}>
        <BestPostSection searchParams={searchParams} />
      </Suspense>

      {/* 검색 바 (페이지네이션 밑, 중앙 정렬 - 0ms 즉시 렌더링 유지, basePath="/" 매핑) */}
      <div className="flex justify-center pt-2">
        <Suspense fallback={<BoardSearchBarSkeleton />}>
          <BoardSearchBar basePath="/" />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
