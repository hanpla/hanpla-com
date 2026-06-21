import { Suspense } from "react";

import Header from "./header";
import HeaderFallback from "./header-fallback";
import BoardPostSection from "./board-post-section";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

export type BoardSearchParams = Promise<{
  page?: string;
  filter?: string;
  searchType?: string;
  searchKeyword?: string;
}>;

interface BoardProps {
  params: BoardPageParams;
  searchParams: BoardSearchParams;
}

// 메인 게시판 레이아웃 셸 (PPR 정적 셸 적용)
const Board = ({ params, searchParams }: BoardProps) => {
  return (
    <div className="space-y-6 py-6">
      {/* 1. 헤더 (1일 캐싱 및 사전 빌드 SSG) */}
      <Suspense fallback={<HeaderFallback />}>
        <Header params={params} />
      </Suspense>

      {/* 2. 포스트 리스트 & 페이징 컨트롤 (PPR 지연 스트리밍 영역) */}
      <Suspense
        fallback={
          <div className="h-96 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900/30" />
        }
      >
        <BoardPostSection params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Board;
