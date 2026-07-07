import { notFound } from "next/navigation";

import { getPostById } from "@/lib/queries/post";
import PageTitle from "@/components/ui/page-title";
import PostDetailSection from "@/components/post/post-detail-section";
import ViewsCounter from "@/components/post/views-counter";

interface BestPostDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const BestPostDetailPage = async ({ params }: BestPostDetailPageProps) => {
  const { id } = await params;

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

      {/* 클라이언트 마운트 시 조회수 증가 비동기 처리 */}
      <ViewsCounter postId={post.id} />
    </>
  );
};

export default BestPostDetailPage;
