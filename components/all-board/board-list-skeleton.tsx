export const BoardListSkeleton = () => {
  return (
    <div className="animate-pulse space-y-12">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-5 w-1 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-6 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="h-27.5 rounded-xl border border-zinc-200 bg-zinc-50/30 p-5 dark:border-zinc-800 dark:bg-zinc-900/10"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
