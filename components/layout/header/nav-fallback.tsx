const NavFallback = () => (
  <div className="flex items-center gap-6 animate-pulse">
    {/* Desktop Links Skeleton */}
    <div className="hidden gap-6 md:flex">
      <div className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-5 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    {/* Theme Toggle & Mobile Trigger Skeleton */}
    <div className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
  </div>
);

export default NavFallback;
