import MenuIcon from "@/components/icons/menu-icon";

const BaseSkeleton = ({ className }: { className?: string }) => (
  <div className={`rounded bg-zinc-200 dark:bg-zinc-800 ${className}`} />
);

const NavFallback = () => (
  <div className="flex h-10 animate-pulse items-center gap-6">
    {/* Desktop Links Skeleton */}
    <div className="hidden items-center gap-6 md:flex">
      <BaseSkeleton className="h-4 w-16" />
      <BaseSkeleton className="h-4 w-12" />
      <BaseSkeleton className="h-4 w-10" />
      <div className="h-10 w-10 rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950/40" />
    </div>

    <div className="flex items-center rounded-lg p-2 text-zinc-600 md:hidden dark:text-zinc-400">
      <MenuIcon className="h-6 w-6" />
    </div>
  </div>
);

export default NavFallback;
