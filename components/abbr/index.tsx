// Components
import Pagination from "../common/Pagination";
import PostList from "./PostList";
import Search from "./Search";

// Types
import { GetPostListResult } from "@/libs/types/board";

interface Props {
  postListData: GetPostListResult;
  isBest?: boolean;
  abbr: string;
  ITEM_PER_PAGE: number;
  currentPage: number;
}

export default function AbbrMain({
  postListData,
  isBest = false,
  abbr,
  ITEM_PER_PAGE,
  currentPage,
}: Props) {
  const postList = postListData.postList;
  const totalCount = postListData.totalCount;
  const totalPage = Math.ceil(totalCount / ITEM_PER_PAGE) || 1;

  return (
    <>
      <PostList postList={postList} isBest={isBest} />
      <Pagination
        href={`/board/${abbr}`}
        currentPage={currentPage}
        totalPage={totalPage}
      />
      <Search abbr={abbr} />
    </>
  );
}
