// Actions
import { getAllBoards } from "@/libs/actions/board";

// Components
import AllBoardList from "@/components/board/AllBoardList";
import PageHeader from "@/components/common/ui/PageHeader";

export default async function BoardPage() {
  const allBoardData = await getAllBoards({});

  return (
    <>
      <PageHeader title="전체 게시판" />
      <AllBoardList allBoardData={allBoardData} />
    </>
  );
}
