import PostListHeader, { POST_GRID_COLS_CLASS } from "../post/post-list-header";

// PC 뷰포트용 개별 행 스켈레톤 (실제 텍스트 행 높이인 52px와 100% 일치하도록 h-5(20px) 및 py-4(32px) 매칭)
const PostRowPcSkeleton = () => (
  <div className={`grid ${POST_GRID_COLS_CLASS} items-center py-4 text-sm`}>
    {/* 제목 & 배지 영역 (h-5로 라인 높이 20px 대칭) */}
    <div className="flex items-center gap-2">
      {/* 배지 스켈레톤 */}
      <div className="h-5 w-10 shrink-0 rounded bg-zinc-200 dark:bg-zinc-800" />
      {/* 제목 텍스트 스켈레톤 */}
      <div className="h-5 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
      {/* 댓글 수 배지 스켈레톤 */}
      <div className="h-5 w-6 rounded bg-zinc-100 dark:bg-zinc-900/50" />
    </div>
    {/* 작성자 */}
    <div className="flex justify-center">
      <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
    {/* 작성일 (text-xs line-height인 16px 대칭을 위해 h-4 적용) */}
    <div className="flex justify-center">
      <div className="h-4 w-10 rounded bg-zinc-150/80 dark:bg-zinc-800/60" />
    </div>
    {/* 조회 */}
    <div className="flex justify-center">
      <div className="h-4 w-8 rounded bg-zinc-150/80 dark:bg-zinc-800/60" />
    </div>
    {/* 추천 */}
    <div className="flex justify-center">
      <div className="h-5 w-6 rounded bg-zinc-200 dark:bg-zinc-800" />
    </div>
  </div>
);

// 모바일 뷰포트용 개별 행 스켈레톤 (한 줄 제목 기준 실제 행 높이 80px와 100% 매칭)
const PostRowMobileSkeleton = () => (
  <div className="space-y-2 py-4">
    <div className="flex items-start justify-between gap-2">
      {/* 제목 스켈레톤 (text-sm leading-snug 20px 대칭을 위해 h-5 적용) */}
      <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
      {/* 댓글 배지 스켈레톤 */}
      <div className="h-5 w-8 rounded bg-zinc-100 dark:bg-zinc-800" />
    </div>
    <div className="flex items-center justify-between pt-1">
      {/* 메타 데이터 (text-xs 16px 대칭을 위해 h-4 적용) */}
      <div className="flex items-center gap-1.5">
        <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-zinc-300 dark:text-zinc-700">•</span>
        <div className="h-4 w-16 rounded bg-zinc-150/80 dark:bg-zinc-800/60" />
      </div>
      {/* 조회 / 추천 스켈레톤 */}
      <div className="flex items-center gap-3">
        <div className="h-4 w-10 rounded bg-zinc-150/80 dark:bg-zinc-800/60" />
        <div className="h-4 w-8 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  </div>
);

const BoardPostSectionSkeleton = () => {
  const rows = Array.from({ length: 10 });

  return (
    <div className="animate-pulse space-y-4">
      {/* PC View (md 이상) */}
      <div className="hidden md:block">
        {/* Table Header */}
        <PostListHeader />

        {/* Table Body rows */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.map((_, index) => (
            <PostRowPcSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Mobile View (md 미만) */}
      <div className="block divide-y divide-zinc-200 md:hidden dark:divide-zinc-800">
        {rows.map((_, index) => (
          <PostRowMobileSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default BoardPostSectionSkeleton;
