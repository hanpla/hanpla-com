import { notFound } from "next/navigation";

import { getBoardByAbbr, getBoards } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";

interface BoardDetailPageProps {
  params: Promise<{
    abbr: string;
  }>;
}

// 1. 빌드 시 정적 사전 생성 경로 정의
export const generateStaticParams = async () => {
  const boards = await getBoards();
  return boards.map((board) => ({
    abbr: board.abbr,
  }));
};

// 2. 개별 게시판 상세 페이지 렌더러
const BoardDetailPage = async ({ params }: BoardDetailPageProps) => {
  const { abbr } = await params;

  // 게시판 상세 정보 로드
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  return (
    <>
      <PageTitle title={board.name} />
      <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>[{board.abbr}] 게시판 글 목록이 여기에 표시될 예정입니다.</p>
      </div>
    </>
  );
};

export default BoardDetailPage;
