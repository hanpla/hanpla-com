const SkeletonItem = () => (
  <div className="flex flex-col gap-2 rounded-lg border border-zinc-100 p-4 dark:border-zinc-800/60">
    <div className="flex items-center justify-between">
      <div className="h-4 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-20 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
    </div>
    <div className="h-5 w-3/4 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
    <div className="flex gap-4 pt-1">
      <div className="h-3 w-12 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-12 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

const ProfilePostsSkeleton = () => {
  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      {/* Sub tabs skeleton */}
      <div className="flex gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-800">
        <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* List skeleton */}
      <div className="space-y-3 pt-2">
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    </div>
  );
};

export default ProfilePostsSkeleton;
