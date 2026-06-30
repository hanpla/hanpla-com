const PostWriteFormSkeleton = () => (
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

export default PostWriteFormSkeleton;
