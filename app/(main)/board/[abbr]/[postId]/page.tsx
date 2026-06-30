import { Suspense } from "react";

import Header from "@/components/board/header";
import HeaderFallback from "@/components/board/header-fallback";
import BoardPostSection from "@/components/board/board-post-section";
import BoardPostSectionSkeleton from "@/components/board/board-post-section-skeleton";
import PostDetailSection from "@/components/post/post-detail-section";
import PostDetailSkeleton from "@/components/post/post-detail-skeleton";
import BoardSearchBar from "@/components/board/board-search-bar";
import BoardSearchBarSkeleton from "@/components/board/board-search-bar-skeleton";
import type { BoardSearchParams } from "@/components/board";

export type PostDetailPageParams = Promise<{
  abbr: string;
  postId: string;
}>;

const PostIdPage = ({
  params,
  searchParams,
}: {
  params: PostDetailPageParams;
  searchParams: BoardSearchParams;
}) => {
  const postIdPromise = params.then((p) => parseInt(p.postId, 10));
  const abbrPromise = params.then((p) => ({ abbr: p.abbr }));

  return (
    <>
      {/* 1. 게시판 헤더 */}
      <Suspense fallback={<HeaderFallback />}>
        <Header params={abbrPromise} />
      </Suspense>

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

      {/* 4. 원래 보던 게시글 목록 */}
      <Suspense fallback={<BoardPostSectionSkeleton />}>
        <BoardPostSection params={abbrPromise} searchParams={searchParams} />
      </Suspense>

      {/* 5. 검색 바 */}
      <div className="flex justify-center pt-2">
        <Suspense fallback={<BoardSearchBarSkeleton />}>
          <BoardSearchBar />
        </Suspense>
      </div>
    </>
  );
};

export default PostIdPage;
