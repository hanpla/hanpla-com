import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import { getPostsByBoardAbbr, GetBoardPostsOptions } from "@/lib/queries/post";
import PageTitle from "@/components/ui/page-title";
import PostDetailSection from "@/components/post/post-detail-section";
import ViewsCounter from "@/components/post/views-counter";
import BoardFilterBar from "@/components/post/board-filter-bar";
import PostList from "@/components/post/post-list";
import Pagination from "@/components/post/pagination";
import SearchForm from "@/components/post/search-form";

interface PostDetailPageProps {
  params: Promise<{
    abbr: string;
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    filter?: string;
    searchType?: string;
    searchKeyword?: string;
  }>;
}

const PostDetailPage = async ({ params, searchParams }: PostDetailPageProps) => {
  const resolvedParams = await params;
  const { abbr, id } = resolvedParams;
  const resolvedSearchParams = await searchParams;

  // 게시판 정보 조회
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

  // 게시글 목록 및 총 개수 조회 (게시글 상세 페이지 하단에 전체 목록 출력용)
  const { posts, totalCount } = await getPostsByBoardAbbr({
    boardAbbr: board.abbr,
    filter: activeFilter,
    page,
    pageSize: 20,
    searchType,
    searchKeyword,
  });

  // postIdPromise를 구성하여 하위 Server Component에 전달합니다.
  const postIdPromise = Promise.resolve(Number(id));

  return (
    <>
      <PageTitle title={board.name} href={`/boards/${board.abbr}`} />
      
      <div className="mt-4">
        <PostDetailSection postIdPromise={postIdPromise} />
      </div>

      {/* 게시글 하단 리스트 필터 바 */}
      <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <BoardFilterBar
          boardAbbr={board.abbr}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />
      </div>

      {/* 게시글 하단 리스트 목록 */}
      <div className="mt-4">
        <PostList
          posts={posts}
          showBoardBadge={false}
          emptyMessage="등록된 게시글이 없습니다."
          searchParams={{
            page: String(page),
            filter: activeFilter,
            searchType,
            searchKeyword,
          }}
        />
      </div>

      {/* 게시글 하단 리스트 최하단 필터 바 */}
      <div className="mt-4">
        <BoardFilterBar
          boardAbbr={board.abbr}
          activeFilter={activeFilter}
          searchType={searchType}
          searchKeyword={searchKeyword}
        />
      </div>

      {/* 게시글 하단 리스트 페이지네이션 */}
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

      {/* 게시글 하단 리스트 검색 폼 */}
      <div className="mt-6">
        <SearchForm
          key={`${searchType || ""}_${searchKeyword || ""}`}
          baseUrl={`/boards/${board.abbr}`}
          defaultType={searchType}
          defaultKeyword={searchKeyword}
        />
      </div>

      {/* 클라이언트 마운트 시 조회수 증가 비동기 처리 */}
      <ViewsCounter postId={Number(id)} />
    </>
  );
};

export default PostDetailPage;
