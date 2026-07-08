"use client";

export const PostWriteFormSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* 제목 입력창 스켈레톤 */}
      <div className="space-y-1.5">
        <div className="h-4 w-12 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-10 w-full rounded-lg bg-zinc-100 dark:bg-zinc-900/60" />
      </div>

      {/* 에디터 래퍼 스켈레톤 */}
      <div className="space-y-1.5">
        <div className="h-4 w-12 rounded-sm bg-zinc-200 dark:bg-zinc-800" />
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800/80">
          {/* 툴바 스켈레톤 */}
          <div className="flex items-center gap-2 border-b border-zinc-200 p-2 dark:border-zinc-800/80">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-md bg-zinc-100 dark:bg-zinc-800" />
            ))}
          </div>
          {/* 본문 스켈레톤 */}
          <div className="h-100 w-full p-4">
            <div className="space-y-3">
              <div className="h-4 w-3/4 rounded-sm bg-zinc-100 dark:bg-zinc-900/60" />
              <div className="h-4 w-1/2 rounded-sm bg-zinc-100 dark:bg-zinc-900/60" />
              <div className="h-4 w-5/6 rounded-sm bg-zinc-100 dark:bg-zinc-900/60" />
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 스켈레톤 */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <div className="h-9 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-9 w-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default PostWriteFormSkeleton;
