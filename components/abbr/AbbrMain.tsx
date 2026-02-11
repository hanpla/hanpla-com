// Components
import Pagination from "../common/ui/Pagination";
import PostList from "./PostList";
import Search from "./Search";
import Taps from "./Taps";

// Types
import { GetPostListResult } from "@/libs/types/board";

// Constatns
import { ITEM_PER_PAGE } from "@/app/board/[abbr]/page";

interface Props {
  abbr: string;
  postListData: GetPostListResult;
  currentPage: number;
  qs: string;
}

export default function AbbrMain({
  abbr,
  postListData,
  currentPage,
  qs,
}: Props) {
  const { postList, totalCount } = postListData;
  const totalPage = Math.ceil(totalCount / ITEM_PER_PAGE) || 1;

  return (
    <>
      <Taps abbr={abbr} />
      <PostList abbr={abbr} postList={postList} qs={qs} />
      <Pagination qs={qs} currentPage={currentPage} totalPage={totalPage} />
      <Search abbr={abbr} />
    </>
  );
}
