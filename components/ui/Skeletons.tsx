"use client";

// Helper component for pulsing skeletal blocks
const SkeletonPulse = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${className}`} />
);

export const PostListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Search and control area skeletons */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <SkeletonPulse className="h-9 w-24" />
        <div className="flex gap-2">
          <SkeletonPulse className="h-9 w-32" />
          <SkeletonPulse className="h-9 w-24" />
        </div>
      </div>

      {/* Table skeleton structure */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex-1 space-y-2.5">
                <SkeletonPulse className="h-5 w-2/3 sm:w-1/2" />
                <div className="flex gap-4">
                  <SkeletonPulse className="h-3 w-16" />
                  <SkeletonPulse className="h-3 w-12" />
                  <SkeletonPulse className="h-3 w-8" />
                </div>
              </div>
              <SkeletonPulse className="h-4 w-10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PostDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Title & metadata skeleton */}
      <div className="space-y-3">
        <SkeletonPulse className="h-8 w-3/4" />
        <div className="flex items-center gap-3">
          <SkeletonPulse className="h-4 w-20" />
          <SkeletonPulse className="h-4 w-16" />
          <SkeletonPulse className="h-4 w-12" />
        </div>
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Content lines skeleton */}
      <div className="space-y-4 py-4">
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-5/6" />
        <SkeletonPulse className="h-4 w-full" />
        <SkeletonPulse className="h-4 w-4/5" />
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200 bg-white/40 p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900/30">
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonPulse className="h-4 w-16" />
            <SkeletonPulse className="h-10 w-full" />
          </div>
        ))}
      </div>
      <SkeletonPulse className="h-10 w-full" />
    </div>
  );
};
