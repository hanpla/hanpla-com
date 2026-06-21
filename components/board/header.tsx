import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/board";
import RecordVisit from "@/components/layout/recent-boards/record-visit";
import BoardHeaderUI from "./header-ui";

export type BoardPageParams = Promise<{
  abbr: string;
}>;

interface HeaderProps {
  params: BoardPageParams;
}

const Header = async ({ params }: HeaderProps) => {
  const { abbr } = await params;
  const res = await getBoardByAbbr(abbr);

  if (!res) {
    notFound();
  }

  const board = { abbr, name: res.name };

  return (
    <>
      <RecordVisit board={board} />

      <BoardHeaderUI name={res.name} abbr={res.abbr} />
    </>
  );
};

export default Header;
