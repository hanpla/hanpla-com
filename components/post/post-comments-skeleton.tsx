const PostCommentsSkeleton = () => {
  return (
    <div className="py-6 border-b border-zinc-200 dark:border-zinc-800 animate-pulse space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-6 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-6 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>
      <div className="h-24 bg-zinc-100 dark:bg-zinc-900 rounded-xl" />
      <div className="space-y-4 pt-2">
        <div className="h-16 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
        <div className="h-16 bg-zinc-100 dark:bg-zinc-900 rounded-lg ml-6" />
        <div className="h-16 bg-zinc-100 dark:bg-zinc-900 rounded-lg" />
      </div>
    </div>
  );
};

export default PostCommentsSkeleton;
