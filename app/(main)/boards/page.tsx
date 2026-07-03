import type { Metadata } from "next";

import PageTitle from "@/components/ui/page-title";
import { BoardList } from "@/components/boards/board-list";

export const metadata: Metadata = {
  title: "게시판 목록 | hanpla-com",
  description: "다양한 주제의 게시판 목록을 확인하고 참여해보세요.",
};

const BoardPage = () => {
  return (
    <>
      <PageTitle title="전체 게시판" />
      <BoardList />
    </>
  );
};

export default BoardPage;
