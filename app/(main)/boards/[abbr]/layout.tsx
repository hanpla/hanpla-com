import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import RecordVisit from "@/components/post/record-visit";

interface BoardLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    abbr: string;
  }>;
}

const BoardLayout = async ({ children, params }: BoardLayoutProps) => {
  const { abbr } = await params;
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  return (
    <>
      {children}
      <RecordVisit board={{ name: board.name, abbr: board.abbr }} />
    </>
  );
};

export default BoardLayout;
