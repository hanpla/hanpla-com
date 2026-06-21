import { getBoards } from "@/lib/queries/board";
import Board from "@/components/board";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

export const generateStaticParams = async () => {
  const boards = await getBoards();
  return boards.map((board) => ({
    abbr: board.abbr,
  }));
};

const BoardAbbrPage = ({ params }: { params: BoardPageParams }) => {
  return <Board params={params} />;
};

export default BoardAbbrPage;
