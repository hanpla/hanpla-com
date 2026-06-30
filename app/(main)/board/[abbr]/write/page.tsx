import { Suspense } from "react";

import { getBoards } from "@/lib/queries/board";
import Header from "@/components/board/header";
import PostWriteForm from "@/components/post/post-write-form";
import PostWriteFormSkeleton from "@/components/post/post-write-form-skeleton";

export const generateStaticParams = async () => {
  const boards = await getBoards();
  return boards.map((board) => ({
    abbr: board.abbr,
  }));
};

interface WritePageProps {
  params: Promise<{
    abbr: string;
  }>;
}

// 비동기 파라미터 및 DB 조회를 처리하는 격리된 비동기 컴포넌트
const WritePageInner = async ({ paramsPromise }: { paramsPromise: Promise<{ abbr: string }> }) => {
  const { abbr } = await paramsPromise;

  return (
    <>
      <Header params={paramsPromise} />
      <PostWriteForm boardAbbr={abbr} />
    </>
  );
};

// 메인 페이지는 동기 셸로 프리렌더링되며, 동적 요소는 Suspense 경계 내부에서 지연 스트리밍 처리됩니다.
const WritePage = ({ params }: WritePageProps) => {
  return (
    <Suspense fallback={<PostWriteFormSkeleton />}>
      <WritePageInner paramsPromise={params} />
    </Suspense>
  );
};

export default WritePage;
