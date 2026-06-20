import { Suspense } from "react";

import Header from "./header";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

interface BoardProps {
  params: BoardPageParams;
}

const Board = async ({ params }: BoardProps) => {
  const { abbr } = await params;

  return (
    <Suspense>
      <Header abbr={abbr} />
    </Suspense>
  );
};

export default Board;

