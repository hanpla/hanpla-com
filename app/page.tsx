import { getBestPosts } from "@/lib/queries/posts";
import BoardDetailView from "@/components/board/BoardDetailView";
import BoardHeader from "@/components/board/BoardHeader";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "인기 게시글들을 모아보는 공간입니다.",
};

export type HomePageSearchParams = Promise<{
  page?: string;
  searchType?: string;
  searchKeyword?: string;
}>;

interface HomePageProps {
  searchParams: HomePageSearchParams;
}

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const { page, searchType, searchKeyword } = resolvedSearchParams;
  const currentPage = parseInt(page || "1", 10) || 1;
  const pageSize = DEFAULT_PAGE_SIZE;

  const { posts, totalCount } = await getBestPosts(
    currentPage,
    pageSize,
    searchType,
    searchKeyword
  );
  return (
    <div className="wrapper space-y-6 py-8">
      <BoardHeader
        title="인기 게시판"
        description="추천을 많이 받은 인기 게시글들을 모아보는 공간입니다."
      />
      <BoardDetailView
        posts={posts}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        searchType={searchType}
        searchKeyword={searchKeyword}
        isBest={true}
        basePath="/best"
      />
    </div>
  );
}
