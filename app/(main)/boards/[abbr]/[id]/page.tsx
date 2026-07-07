import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";

interface PostDetailPageProps {
  params: Promise<{
    abbr: string;
    id: string;
  }>;
}

const PostDetailPage = async ({ params }: PostDetailPageProps) => {
  const { abbr, id } = await params;

  // 게시판 정보 조회
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  return (
    <>
      <PageTitle title={board.name} href={`/boards/${board.abbr}`} />
      
      <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>
          [{board.name}] 게시판의 {id}번 게시글 상세 페이지가 여기에 표시될 예정입니다.
        </p>
      </div>
    </>
  );
};

export default PostDetailPage;
