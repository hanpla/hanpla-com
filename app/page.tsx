// Actions
import { getPostList } from "@/libs/actions/board";

// Components
import AbbrMain from "@/components/abbr";
import PageTitle from "@/components/common/TitleText";

export default async function Home() {
  const postListData = await getPostList({
    abbr: "best",
    page: 1,
    limit: 20,
    likeCount: 0,
  });

  return (
    <>
      <PageTitle title="인기글" href="/" />
      <AbbrMain postListData={postListData} isBest abbr="best" />
    </>
  );
}
