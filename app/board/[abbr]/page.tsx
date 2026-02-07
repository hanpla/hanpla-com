// Actions
import { getAbbrName, getPostList } from "@/libs/actions/board";

// Components
import AbbrMain from "@/components/abbr";
import AbbrHeader from "@/components/abbr/AbbrHeader";

// Types
type Params = Promise<{ abbr: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

const ITEM_PER_PAGE = 1;

export default async function AbbrPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ abbr }, search] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const normalizedParams = {
    page: Number(search.page || 1),
    likeCount: Number(search.likeCount || 0),
    searchType: search.searchType,
    postSearch: search.postSearch,
  };

  const isBest = abbr === "best";

  const [abbrName, postListData] = await Promise.all([
    isBest ? "인기글" : getAbbrName(abbr),
    getPostList({
      abbr,
      page: normalizedParams.page,
      limit: ITEM_PER_PAGE,
      likeCount: normalizedParams.likeCount,
      searchType: normalizedParams.searchType,
      searchKeyword: normalizedParams.postSearch,
    }),
  ]);

  return (
    <>
      <AbbrHeader abbrName={abbrName} href={`/board/${abbr}`} isBest={isBest} />
      <AbbrMain
        postListData={postListData}
        abbr={abbr}
        ITEM_PER_PAGE={ITEM_PER_PAGE}
        currentPage={normalizedParams.page}
        isBest={isBest}
      />
    </>
  );
}
