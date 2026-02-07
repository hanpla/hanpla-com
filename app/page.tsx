// Actions
import { getPostList } from "@/libs/actions/board";

// Components
import AbbrMain from "@/components/abbr";
import PageTitle from "@/components/common/TitleText";

const ITEM_PER_PAGE = 1;
const LIKE_COUNT = 0;

export default async function Home() {
  const postListData = await getPostList({
    abbr: "best",
    page: 1,
    limit: ITEM_PER_PAGE,
    likeCount: LIKE_COUNT,
  });

  return (
    <>
      <PageTitle title="인기글" href="/" />
      <AbbrMain
        postListData={postListData}
        isBest
        abbr="best"
        ITEM_PER_PAGE={ITEM_PER_PAGE}
        currentPage={1}
      />
    </>
  );
}
