import { getBoards } from "@/lib/queries/board";
import Board, { BoardPageParams, BoardSearchParams } from "@/components/board";

export const generateStaticParams = async () => {
  const boards = await getBoards();
  return boards.map((board) => ({
    abbr: board.abbr,
  }));
};

const BoardAbbrPage = ({
  params,
  searchParams,
}: {
  params: BoardPageParams;
  searchParams: BoardSearchParams;
}) => {
  return <Board params={params} searchParams={searchParams} />;
};

export default BoardAbbrPage;
