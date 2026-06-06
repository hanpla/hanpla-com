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
    <div className="wrapper space-y-6 py-8">
      {/* Header */}
      <BoardHeader board={board} />
      {children}
    </div>
  );
}
