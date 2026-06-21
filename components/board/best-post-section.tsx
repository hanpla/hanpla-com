import BoardNavArea from "./board-nav-area";
import PostListUi from "@/components/post/post-list-ui";
import { getBestPosts } from "@/lib/queries/posts";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { BoardSearchParams } from "./index";

interface BestPostSectionProps {
  searchParams: BoardSearchParams;
}

const BestPostSection = async ({ searchParams }: BestPostSectionProps) => {
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const searchType = resolvedSearchParams.searchType;
  const searchKeyword = resolvedSearchParams.searchKeyword;

  // 비동기 DB 조회 (1시간 캐싱 및 검색 필터 연계)
  const { posts, totalCount } = await getBestPosts({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    searchType,
    searchKeyword,
  });

  return (
    <div className="space-y-6">
      {/* 포스트 목록 프레젠터 (인기게시판이므로 showBoardName=true, 상세 이동은 /best/{id} 매핑) */}
      <PostListUi
        posts={posts}
        showBoardName={true}
        getPostLink={(post) => `/best/${post.id}`}
      />

      {/* 하단 페이지네이션 및 점프 컨트롤러 (basePath="/" 로 매핑) */}
      <BoardNavArea
        boardAbbr="best"
        currentPage={page}
        totalCount={totalCount}
        pageSize={DEFAULT_PAGE_SIZE}
        activeFilter="all"
        searchType={searchType}
        searchKeyword={searchKeyword}
        basePath="/"
      />
    </div>
  );
};

export default BestPostSection;
