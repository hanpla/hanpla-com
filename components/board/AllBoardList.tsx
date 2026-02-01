import Link from "next/link";

// Icons
import { ChevronRight } from "lucide-react";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoardData: BoardType[];
}

export default function AllBoardList({ allBoardData }: Props) {
  return (
    <BoardListContainer>
      <BoardGrid>
        {allBoardData.map((board) => (
          <BoardItem key={board.abbr} board={board} />
        ))}
      </BoardGrid>
    </BoardListContainer>
  );
}

const BoardListContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4">{children}</div>
);

const BoardGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {children}
  </div>
);

const BoardItem = ({ board }: { board: BoardType }) => {
  return (
    <Link
      href={`/board/${board.abbr}`}
      className="group block p-5 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200"
    >
      <div className="flex justify-between items-center">
        <BoardItemInfo abbr={board.abbr} name={board.name} />
        <BoardItemArrow />
      </div>
    </Link>
  );
};

const BoardItemInfo = ({ abbr, name }: { abbr: string; name: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
      {abbr}
    </span>
    <h3 className="text-lg font-semibold text-neutral-800 group-hover:text-neutral-700 transition-colors">
      {name}
    </h3>
  </div>
);

const BoardItemArrow = () => (
  <div className="bg-neutral-50 p-2 rounded-full group-hover:bg-neutral-100 transition-colors">
    <ChevronRight
      size={18}
      className="text-neutral-300 group-hover:text-neutral-600 transition-colors"
    />
  </div>
);
