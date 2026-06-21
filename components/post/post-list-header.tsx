export const POST_GRID_COLS_CLASS = "grid-cols-[1fr_112px_80px_80px_64px]";

const PostListHeader = () => {
  return (
    <div className={`grid ${POST_GRID_COLS_CLASS} border-b border-zinc-200 bg-zinc-100/40 py-3.5 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400`}>
      <div className="text-center">제목</div>
      <div className="text-center">작성자</div>
      <div className="text-center">작성일</div>
      <div className="text-center">조회</div>
      <div className="text-center">추천</div>
    </div>
  );
};

export default PostListHeader;
