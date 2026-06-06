import { getBoardByAbbr } from "@/lib/queries/board";
import BoardHeader from "@/components/board/BoardHeader";
import { notFound } from "next/navigation";

export type BoardLayoutParams = Promise<{
  abbr: string;
}>;

interface BoardLayoutProps {
  children: React.ReactNode;
  params: BoardLayoutParams;
}

export default async function BoardLayout({ children, params }: BoardLayoutProps) {
  const { abbr } = await params;
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {/* Header */}
        <BoardHeader board={board} />
        {children}
      </div>
    </div>
  );
}
