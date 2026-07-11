import { notFound } from "next/navigation";

import { getPostById } from "@/lib/queries/post";
import PageTitle from "@/components/ui/page-title";
import PostDetailSection from "@/components/post/post-detail-section";
import ViewsCounter from "@/components/post/views-counter";
import BestPostBoard from "@/components/post/best-post-board";

interface BestPostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  }>;
}

const BestPostDetailPage = async ({ params, searchParams }: BestPostDetailPageProps) => {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  // 게시글 정보 조회 (실시간 DB 조회)
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageTitle title="인기 게시글" href="/best" />

      <div className="mt-4">
        <PostDetailSection postIdPromise={Promise.resolve(post.id)} />
      </div>

      {/* 인기글 목록 및 페이지네이션/검색 통합 보드 */}
      <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <BestPostBoard searchParams={resolvedSearchParams} baseUrl="/best" />
      </div>

      {/* 클라이언트 마운트 시 조회수 증가 비동기 처리 */}
      <ViewsCounter postId={post.id} />
    </>
  );
};

export default BestPostDetailPage;
