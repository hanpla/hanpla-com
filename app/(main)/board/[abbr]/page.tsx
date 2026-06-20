import { Suspense } from "react";

import Board from "@/components/board";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

const BoardAbbrPage = ({ params }: { params: BoardPageParams }) => {
  return (
    <Suspense fallback={<div />}>
      <Board params={params} />
    </Suspense>
  );
};

export default BoardAbbrPage;

