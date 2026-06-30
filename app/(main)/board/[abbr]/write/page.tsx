import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getBoardName } from "@/lib/queries/board";
import PostWriteForm from "@/components/post/post-write-form";

// 폼 스켈레톤 로더
const FormSkeleton = () => (
  <div className="animate-pulse space-y-6 py-6">
    <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
      <div className="h-8 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-10 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-96 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="flex justify-end gap-3 pt-4">
      <div className="h-10 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-10 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

interface WritePageProps {
  params: Promise<{
    abbr: string;
  }>;
}

// 비동기 파라미터 및 DB 조회를 처리하는 격리된 비동기 컴포넌트
const WritePageInner = async ({ paramsPromise }: { paramsPromise: Promise<{ abbr: string }> }) => {
  const { abbr } = await paramsPromise;
  const board = await getBoardName(abbr);

  if (!board) {
    notFound();
  }

  return (
    <PostWriteForm boardAbbr={abbr} boardName={board.name} />
  );
};

// 메인 페이지는 동기 셸로 프리렌더링되며, 동적 요소는 Suspense 경계 내부에서 지연 스트리밍 처리됩니다.
const WritePage = ({ params }: WritePageProps) => {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <WritePageInner paramsPromise={params} />
    </Suspense>
  );
};

export default WritePage;
