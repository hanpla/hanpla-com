import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";
import PostDetailSection from "@/components/post/post-detail-section";

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
    </>
  );
};

export default PostDetailPage;
