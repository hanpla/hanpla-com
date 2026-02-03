// Actions
import { getAbbrName, getPostList } from "@/libs/actions/board";

import PageTitle from "@/components/common/TitleText";
import AbbrMain from "@/components/abbr";

type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const LIKE_COUNT = 20;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { abbr } = await props.params;
  const { searchType, postSearch, likeCount, page } = await props.searchParams;
  const abbrName = await getAbbrName(abbr);

  const realLikecount = abbr === "best" ? LIKE_COUNT : Number(likeCount) || 0;
  const realPage = page ? Number(page) : 1;
  const abbrTitle = abbr === "best" ? "인기 게시판" : abbrName;

  const postListData = await getPostList({
    abbr,
    page: realPage,
    limit: 20,
    likeCount: realLikecount,
    searchType,
    searchKeyword: postSearch,
  });

  return (
    <>
      <PageTitle title={abbrTitle} href="/" />
      <AbbrMain postListData={postListData} abbr={abbr} />
    </>
  );
}
