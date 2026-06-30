const PostDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* 헤더 메타 영역 스켈레톤 */}
      <div className="space-y-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <div className="h-8 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>

      {/* 본문 영역 스켈레톤 */}
      <div className="space-y-3 py-4">
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
