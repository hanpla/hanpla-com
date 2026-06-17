const BaseSkeleton = ({ className }: { className?: string }) => (
  <div className={`rounded bg-zinc-200 dark:bg-zinc-800 ${className}`} />
);

const NavFallback = () => (
  <div className="flex animate-pulse items-center gap-6">
    {/* Desktop Links Skeleton */}
    <div className="hidden gap-6 md:flex">
      <BaseSkeleton className="h-5 w-16" />
      <BaseSkeleton className="h-5 w-12" />
      <BaseSkeleton className="h-5 w-10" />
    </div>
    {/* Theme Toggle & Mobile Trigger Skeleton */}
    <BaseSkeleton className="h-8 w-8" />
  </div>
);

export default NavFallback;
