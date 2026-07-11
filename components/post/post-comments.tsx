interface PostCommentsProps {
  commentsCount: number;
}

export const PostComments = ({ commentsCount }: PostCommentsProps) => {
  return (
    <div className="py-6 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-extrabold text-lg text-zinc-900 dark:text-zinc-100">댓글</span>
        <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {commentsCount}
        </span>
      </div>

      {/* 댓글 입력창 placeholder */}
      <div className="space-y-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
          <textarea
            disabled
            placeholder="로그인 후 댓글을 작성할 수 있습니다."
            className="w-full h-16 bg-transparent text-sm resize-none text-zinc-500 dark:text-zinc-400 focus:outline-none placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          <div className="flex justify-between items-center border-t border-zinc-150 dark:border-zinc-800/80 pt-3 mt-2 text-xs text-zinc-400">
            <span>0 / 500자</span>
            <button
              disabled
              className="px-3.5 py-1.5 bg-zinc-200 text-zinc-400 font-semibold rounded-lg dark:bg-zinc-800 dark:text-zinc-600"
            >
              등록
            </button>
          </div>
        </div>

        {/* 임시 댓글 리스트 */}
        <div className="text-center py-10 text-sm text-zinc-400 dark:text-zinc-500">
          아직 작성된 댓글이 없습니다. 첫 댓글을 남겨보세요.
        </div>
      </div>
    </div>
  );
};

export default PostComments;
