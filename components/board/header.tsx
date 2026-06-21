import { notFound } from "next/navigation";

import { getBoardName } from "@/lib/queries/board";
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
  const res = await getBoardName(abbr);

  if (!res) {
    notFound();
  }

  const board = { abbr, name: res.name };

  return (
    <>
      <RecordVisit board={board} />

      <BoardHeaderUI
        name={res.name}
        abbr={abbr}
        desc={`${res.name} 주제에 관해 자유롭게 소통하는 공간입니다.`}
      />
    </>
  );
};

export default Header;
