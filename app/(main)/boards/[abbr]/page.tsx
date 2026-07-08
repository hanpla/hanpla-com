import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import { getPostsByBoardAbbr, GetBoardPostsOptions } from "@/lib/queries/post";
import PageTitle from "@/components/ui/page-title";
import BoardFilterBar from "@/components/post/board-filter-bar";
import PostList from "@/components/post/post-list";
import Pagination from "@/components/post/pagination";
import SearchForm from "@/components/post/search-form";

interface BoardDetailPageProps {
  params: Promise<{
    abbr: string;
  }>;
  searchParams: Promise<{
    page?: string;
    filter?: string;
    searchType?: string;
    searchKeyword?: string;
  }>;
}

// 1. 개별 게시판 상세 페이지 렌더러
const BoardDetailPage = async ({ params, searchParams }: BoardDetailPageProps) => {
  const { abbr } = await params;
  const resolvedSearchParams = await searchParams;

  // 게시판 상세 정보 로드
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  const activeFilter = (resolvedSearchParams.filter === "popular" ? "popular" : "all") as
    | "all"
    | "popular";
  const page = Number(resolvedSearchParams.page) || 1;
  const searchType = resolvedSearchParams.searchType as GetBoardPostsOptions["searchType"];
  const searchKeyword = resolvedSearchParams.searchKeyword;

  // 게시글 목록 및 총 개수 조회
  const { posts, totalCount } = await getPostsByBoardAbbr({
    boardAbbr: board.abbr,
    filter: activeFilter,
    page,
    pageSize: 20,
    searchType,
    searchKeyword,
  });

  return (
    <>
      <PageTitle title={board.name} href={`/boards/${board.abbr}`} />

      {/* 1. 상단 필터 바 */}
      <div className="mt-4">
        <BoardFilterBar
          boardAbbr={board.abbr}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />
      </div>

      {/* 2. 게시글 목록 */}
      <div className="mt-4">
        <PostList
          posts={posts}
          showBoardBadge={false} // 개별 게시판이므로 게시판 배지는 노출 안 함
          emptyMessage="등록된 게시글이 없습니다."
          searchParams={{
            page: String(page),
            filter: activeFilter,
            searchType,
            searchKeyword,
          }}
        />
      </div>

      {/* 3. 하단 필터 바 */}
      <div className="mt-4">
        <BoardFilterBar
          boardAbbr={board.abbr}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />
      </div>

      {/* 4. 페이지네이션 */}
      <div className="mt-6">
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          pageSize={20}
          basePath={`/boards/${board.abbr}`}
          searchParams={{
            filter: activeFilter,
            searchType,
            searchKeyword,
          }}
        />
      </div>

      {/* 5. 검색 폼 */}
      <div className="mt-6">
        <SearchForm
          key={`${searchType || ""}_${searchKeyword || ""}`}
          baseUrl={`/boards/${board.abbr}`}
          defaultType={searchType}
          defaultKeyword={searchKeyword}
        />
      </div>
    </>
  );
};

export default BoardDetailPage;
