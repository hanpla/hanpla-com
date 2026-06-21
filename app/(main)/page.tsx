import { Suspense } from "react";
import type { Metadata } from "next";

import BoardHeaderUI from "@/components/board/header-ui";
import PostList from "@/components/post/post-list";

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "인기 게시글들을 모아보는 공간입니다.",
};

const Home = () => {
  return (
    <div>
      <BoardHeaderUI name="인기 게시판" abbr="best" desc="인기 게시글들을 모아보는 공간입니다." />
      <Suspense>
        <PostList />
      </Suspense>
    </div>
  );
};


export default Home;
