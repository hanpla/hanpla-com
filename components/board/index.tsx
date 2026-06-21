import { Suspense } from "react";

import Header from "./header";
import HeaderFallback from "./header-fallback";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

interface BoardProps {
  params: BoardPageParams;
}

const Board = ({ params }: BoardProps) => {
  return (
    <div className="space-y-6 py-6">
      <Suspense fallback={<HeaderFallback />}>
        <Header params={params} />
      </Suspense>
    </div>
  );
};

export default Board;
