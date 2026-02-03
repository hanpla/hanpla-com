// Components
import PostList from "./PostList";
import Search from "./Search";

// Types
import { GetPostListResult } from "@/libs/types/board";

// Types
interface Props {
  postListData: GetPostListResult;
  isBest?: boolean;
  abbr: string;
}

export default function AbbrMain({
  postListData,
  isBest = false,
  abbr,
}: Props) {
  const postList = postListData.postList;
  const totalCount = postListData.totalCount;

  return (
    <>
      <PostList postList={postList} isBest={isBest} />
      <Search abbr={abbr} />
    </>
  );
}
