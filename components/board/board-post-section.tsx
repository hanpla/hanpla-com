import { getPostsByBoardAbbr } from "@/lib/queries/posts";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { PostWithRelations } from "@/types/post";
import type { BoardPageParams, BoardSearchParams } from "./index";
import PostListUi from "@/components/post/post-list-ui";
import BoardNavArea from "./board-nav-area";

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

  const getPostLink = (post: PostWithRelations) => {
    const paramsObj = new URLSearchParams();
    if (resolvedSearchParams.page) paramsObj.set("page", resolvedSearchParams.page);
    if (resolvedSearchParams.filter) paramsObj.set("filter", resolvedSearchParams.filter);
    if (resolvedSearchParams.searchType)
      paramsObj.set("searchType", resolvedSearchParams.searchType);
    if (resolvedSearchParams.searchKeyword)
      paramsObj.set("searchKeyword", resolvedSearchParams.searchKeyword);

    const queryStr = paramsObj.toString();
    return `/board/${post.board_abbr}/${post.id}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="space-y-6">
      {/* 포스트 목록 프레젠터 */}
      <PostListUi posts={posts} showBoardName={false} getPostLink={getPostLink} />

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
    </div>
  );
};

export default BoardPostSection;
