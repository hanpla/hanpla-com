// Actions
import { getPostList } from "@/libs/actions/board";

// Components
import AbbrMain from "@/components/abbr/AbbrMain";
import PageHeader from "@/components/common/ui/PageHeader";

// Constants
const abbr = "best";
const BEST_ABBR_HREF = "/board/best";
const LIKE_COUNT = 10;
import { ITEM_PER_PAGE } from "./board/[abbr]/page";

export default async function Home() {
  const postListData = await getPostList({
    abbr,
    page: 1,
    limit: ITEM_PER_PAGE,
    likeCount: LIKE_COUNT,
  });

  return (
    <>
      <PageHeader title={"인기 게시판"} href={BEST_ABBR_HREF} />
      <AbbrMain abbr={abbr} postListData={postListData} currentPage={1} qs="" />
    </>
  );
}
