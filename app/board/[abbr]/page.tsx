// Actions
import { getAbbrName, getPostList } from "@/libs/actions/board";

// Utils
import { getBoardParams } from "@/libs/utils/board";

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
  const { abbr, search } = await getBoardParams(
    props.params,
    props.searchParams,
  );

  const isBest = abbr === "best";

  const [abbrName, postListData] = await Promise.all([
    isBest ? "인기글" : getAbbrName(abbr),
    getPostList({
      abbr,
      page: search.page,
      limit: ITEM_PER_PAGE,
      likeCount: search.likeCount,
      searchType: search.searchType,
      searchKeyword: search.postSearch,
    }),
  ]);

  return (
    <>
      <AbbrHeader abbrName={abbrName} href={`/board/${abbr}`} isBest={isBest} />
      <AbbrMain
        postListData={postListData}
        abbr={abbr}
        ITEM_PER_PAGE={ITEM_PER_PAGE}
        currentPage={search.page}
        isBest={isBest}
      />
    </>
  );
}
