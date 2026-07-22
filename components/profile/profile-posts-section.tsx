const ProfilePostsSection = () => {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-sm flex-col items-center justify-center space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          📝
        </div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
          내가 작성한 글 & 댓글
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          작성한 게시글 및 댓글 목록 조회 기능은 준비 중입니다.
        </p>
      </div>
    </section>
  );
};

export default ProfilePostsSection;
