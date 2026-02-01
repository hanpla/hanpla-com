// Actions
import { getAllBoards } from "@/libs/actions/board";

// Components
import AllBoardList from "@/components/board/AllBoardList";
import PageTitle from "@/components/common/TitleText";

export default async function BoardPage() {
  const allBoardData = await getAllBoards({});

  return (
    <>
      <PageTitle title="전체 게시판" />
      <AllBoardList allBoardData={allBoardData} />
    </>
  );
}
