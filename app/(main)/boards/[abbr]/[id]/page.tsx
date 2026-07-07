import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";
import PostDetailSection from "@/components/post/post-detail-section";
import ViewsCounter from "@/components/post/views-counter";

interface PostDetailPageProps {
  params: Promise<{
    abbr: string;
    id: string;
  }>;
}

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const resolvedParams = await params;
  const { abbr, id } = resolvedParams;

  // 게시판 정보 조회
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  // postIdPromise를 구성하여 하위 Server Component에 전달합니다.
  const postIdPromise = Promise.resolve(Number(id));

  return (
    <>
      <PageTitle title={board.name} href={`/boards/${board.abbr}`} />
      
      <div className="mt-4">
        <PostDetailSection postIdPromise={postIdPromise} />
      </div>

      {/* 클라이언트 마운트 시 조회수 증가 비동기 처리 */}
      <ViewsCounter postId={Number(id)} />
    </>
  );
};

export default PostDetailPage;
