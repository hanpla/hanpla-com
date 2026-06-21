import { getBestPosts, getPostsByBoardAbbr } from "@/lib/queries/posts";

import PostListUi from "./post-list-ui";

interface PostListProps {
  boardAbbr?: string;
  isBest?: boolean;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchType?: string;
  searchKeyword?: string;
}

const PostList = async ({
  boardAbbr,
  isBest = false,
  page = 1,
  pageSize,
  filter,
  searchType,
  searchKeyword,
}: PostListProps) => {
  // 1. 전체 인기글(best)인지 특정 게시판 목록인지 판별
  const isBestPage = isBest || boardAbbr === "best" || !boardAbbr;

  let posts = [];
  if (isBestPage) {
    // 인기글 조회 (1시간 캐싱)
    const result = await getBestPosts({
      page,
      pageSize,
      searchType,
      searchKeyword,
    });
    posts = result.posts;
  } else {
    // 일반 게시판 글 조회 (1분 캐싱)
    const result = await getPostsByBoardAbbr({
      boardAbbr,
      filter,
      page,
      pageSize,
      searchType,
      searchKeyword,
    });
    posts = result.posts;
  }

  // 인기글일 때는 각 글이 속한 게시판 이름을 보여주는 배지(showBoardName) 활성화
  const showBoardName = isBestPage;

  return (
    <PostListUi
      posts={posts}
      showBoardName={showBoardName}
    />
  );
};

export default PostList;
