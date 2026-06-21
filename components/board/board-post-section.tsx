import { Suspense } from "react";
import BoardNavArea from "./board-nav-area";
import BoardSearchBar from "./board-search-bar";
import BoardSearchBarSkeleton from "./board-search-bar-skeleton";
import PostListUi from "@/components/post/post-list-ui";
import { getPostsByBoardAbbr } from "@/lib/queries/posts";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

import { BoardPageParams, BoardSearchParams } from "./index";

interface BoardPostSectionProps {
  params: BoardPageParams;
  searchParams: BoardSearchParams;
}

const BoardPostSection = async ({ params, searchParams }: BoardPostSectionProps) => {
  const { abbr } = await params;
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const filter = (resolvedSearchParams.filter as "all" | "popular") || "all";
  const searchType = resolvedSearchParams.searchType;
  const searchKeyword = resolvedSearchParams.searchKeyword;

  // 비동기 DB 조회 (1분 캐싱 및 검색 필터 연계)
  const { posts, totalCount } = await getPostsByBoardAbbr({
    boardAbbr: abbr,
    filter,
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    searchType,
    searchKeyword,
  });

  return (
    <div className="space-y-6">
      {/* 포스트 목록 프레젠터 */}
      <PostListUi posts={posts} showBoardName={false} />

      {/* 하단 페이지네이션 및 점프 컨트롤러 */}
      <BoardNavArea
        boardAbbr={abbr}
        currentPage={page}
        totalCount={totalCount}
        pageSize={DEFAULT_PAGE_SIZE}
        activeFilter={filter}
        searchType={searchType}
        searchKeyword={searchKeyword}
      />

      {/* 검색 바 (페이지네이션 밑, 중앙 정렬) */}
      <div className="flex justify-center pt-2">
        <Suspense fallback={<BoardSearchBarSkeleton />}>
          <BoardSearchBar />
        </Suspense>
      </div>
    </div>
  );
};

export default BoardPostSection;
