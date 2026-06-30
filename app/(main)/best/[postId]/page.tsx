import { Suspense } from "react";

import BoardHeaderUI from "@/components/board/header-ui";
import BestPostSection from "@/components/board/best-post-section";
import BoardPostSectionSkeleton from "@/components/board/board-post-section-skeleton";
import BoardSearchBar from "@/components/board/board-search-bar";
import BoardSearchBarSkeleton from "@/components/board/board-search-bar-skeleton";
import PostDetailSection from "@/components/post/post-detail-section";
import PostDetailSkeleton from "@/components/post/post-detail-skeleton";
import type { BoardSearchParams } from "@/components/board";

export type BestPostDetailPageParams = Promise<{
  postId: string;
}>;

const BestPostDetailPage = ({
  params,
  searchParams,
}: {
  params: BestPostDetailPageParams;
  searchParams: BoardSearchParams;
}) => {
  const postIdPromise = params.then((p) => parseInt(p.postId, 10));

  return (
    <>
      {/* 1. 인기 게시판 헤더 고정 */}
      <BoardHeaderUI name="인기 게시판" abbr="best" />

      {/* 2. 게시글 상세 본문 */}
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetailSection postIdPromise={postIdPromise} />
      </Suspense>

      {/* 3. 댓글 영역 스텁 */}
      <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">댓글</h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">댓글 기능은 준비 중입니다.</p>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* 4. 인기글 목록 & 페이징 영역 */}
      <Suspense fallback={<BoardPostSectionSkeleton showFilter={false} />}>
        <BestPostSection searchParams={searchParams} />
      </Suspense>

      {/* 5. 검색 바 */}
      <div className="flex justify-center pt-2">
        <Suspense fallback={<BoardSearchBarSkeleton />}>
          <BoardSearchBar basePath="/" />
        </Suspense>
      </div>
    </>
  );
};

export default BestPostDetailPage;
