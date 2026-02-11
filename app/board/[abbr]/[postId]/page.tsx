import { redirect } from "next/navigation";

// Actions
import { getPostList } from "@/libs/actions/board";
import { getPostDetailData } from "@/libs/actions/post";

// Utils
import { formatAbbrSearchParams } from "@/libs/utils/format";
import { generateAbbrQS } from "@/libs/utils/generate";

// Components
import AbbrMain from "@/components/abbr/AbbrMain";
import PostDetail from "@/components/post/PostDetail";

// Types
type Params = Promise<{ abbr: string; postId: number }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

// Constatns
const LIKE_COUNT = 10;
export const ITEM_PER_PAGE = 1;

export default async function AbbrPostPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const [{ abbr, postId }, search] = await Promise.all([
    props.params,
    props.searchParams,
  ]);

  const normalizedSearch = formatAbbrSearchParams(search);
  const postListData = await getPostList({
    abbr,
    page: normalizedSearch.page,
    limit: ITEM_PER_PAGE,
    likeCount: LIKE_COUNT,
    searchType: normalizedSearch.searchType,
    searchKeyword: normalizedSearch.postSearch,
  });

  const qs = generateAbbrQS(normalizedSearch);
  const postDetailData = await getPostDetailData(postId);

  if (!postDetailData) redirect(`/board/${abbr}?${qs}`);

  console.log(postDetailData);

  return (
    <>
      <PostDetail postDetailData={postDetailData} />
      <AbbrMain
        abbr={abbr}
        postListData={postListData}
        currentPage={normalizedSearch.page}
        qs={qs}
      />
    </>
  );
}
