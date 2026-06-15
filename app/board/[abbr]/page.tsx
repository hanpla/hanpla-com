import { getPostsByBoardAbbr } from "@/lib/queries/posts";
import { getBoardByAbbr } from "@/lib/queries/board";
import BoardDetailView from "@/components/board/BoardDetailView";
import BoardHeader from "@/components/board/BoardHeader";
import RecordVisit from "@/components/layout/RecordVisit";
import { notFound } from "next/navigation";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

export type BoardPageSearchParams = Promise<{
  filter?: string;
  page?: string;
  searchType?: string;
  searchKeyword?: string;
}>;

export interface BoardPageProps {
  params: BoardPageParams;
  searchParams: BoardPageSearchParams;
}

export const generateMetadata = async ({ params }: BoardPageProps) => {
  const { abbr } = await params;
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    return {
      title: "게시판을 찾을 수 없음 - hanpla-com",
    };
  }

  return {
    title: `${board.name} 게시판 - hanpla-com`,
    description: `${board.name} 주제에 대해 이야기하고 다양한 게시글을 확인해 보세요.`,
  };
}

export default async function BoardPage({ params, searchParams }: BoardPageProps) {
  const { abbr } = await params;
  const { filter, page, searchType, searchKeyword } = await searchParams;
  const currentPage = parseInt(page || "1", 10) || 1;
  const pageSize = DEFAULT_PAGE_SIZE;

  const [board, { posts, totalCount }] = await Promise.all([
    getBoardByAbbr(abbr),
    getPostsByBoardAbbr(abbr, filter, currentPage, pageSize, searchType, searchKeyword),
  ]);

  if (!board) {
    notFound();
  }

  return (
    <div className="wrapper space-y-6 py-8">
      <BoardHeader board={board} />
      <BoardDetailView
        boardAbbr={abbr}
        posts={posts}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        activeFilter={filter === "popular" ? "popular" : "all"}
        searchType={searchType}
        searchKeyword={searchKeyword}
      />
      <RecordVisit board={board} />
    </div>
  );
}

