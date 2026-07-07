import { getBestPosts, GetBestPostsOptions } from "@/lib/queries/post";
import { PostList } from "./post-list";
import { Pagination } from "./pagination";
import { SearchForm } from "./search-form";

interface BestPostBoardProps {
  searchParams: {
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  };
  baseUrl: string;
}

export const BestPostBoard = async ({ searchParams, baseUrl }: BestPostBoardProps) => {
  const page = Number(searchParams.page) || 1;
  const searchType = searchParams.searchType as GetBestPostsOptions["searchType"];
  const searchKeyword = searchParams.searchKeyword;

  // 인기 게시글 목록 조회
  const { posts, totalCount } = await getBestPosts({
    page,
    limit: 20,
    searchType,
    searchKeyword,
  });

  return (
    <div className="space-y-6">
      <PostList
        posts={posts}
        showBoardBadge={true}
        emptyMessage="인기 게시글이 없습니다."
        baseLinkPath="/best"
        searchParams={{
          page: String(page),
          searchType,
          searchKeyword,
        }}
      />
      <Pagination
        currentPage={page}
        totalCount={totalCount}
        pageSize={20}
        basePath={baseUrl}
        searchParams={{
          searchType,
          searchKeyword,
        }}
      />
      <SearchForm
        key={`${searchType || ""}_${searchKeyword || ""}`}
        baseUrl={baseUrl}
        defaultType={searchType}
        defaultKeyword={searchKeyword}
      />
    </div>
  );
};

export default BestPostBoard;
