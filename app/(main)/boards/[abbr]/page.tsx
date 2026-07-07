import { notFound } from "next/navigation";

import { getBoardByAbbr, getBoards } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";
import BoardFilterBar from "@/components/post/board-filter-bar";

interface BoardDetailPageProps {
  params: Promise<{
    abbr: string;
  }>;
  searchParams: Promise<{
    page?: string;
    filter?: string;
    searchType?: string;
    searchKeyword?: string;
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
const BoardDetailPage = async ({ params, searchParams }: BoardDetailPageProps) => {
  const { abbr } = await params;
  const resolvedSearchParams = await searchParams;

  // 게시판 상세 정보 로드
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  const activeFilter = resolvedSearchParams.filter === "popular" ? "popular" : "all";

  return (
    <>
      <PageTitle title={board.name} />
      
      <div className="mt-4">
        <BoardFilterBar
          boardAbbr={board.abbr}
          activeFilter={activeFilter}
          searchType={resolvedSearchParams.searchType}
          searchKeyword={resolvedSearchParams.searchKeyword}
        />
      </div>

      <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        <p>[{board.abbr}] 게시판 글 목록이 여기에 표시될 예정입니다.</p>
      </div>
    </>
  );
};

export default BoardDetailPage;
