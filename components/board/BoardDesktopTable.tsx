import { formatTimeOrDate } from "@/lib/utils/time";
import type { Post } from "@/lib/queries/posts";
import Link from "next/link";

interface BoardDesktopTableProps {
  posts: Post[];
}

export default function BoardDesktopTable({ posts }: BoardDesktopTableProps) {
  return (
    <div className="hidden md:block">
      {/* Table Header using CSS Grid */}
      <div className="grid grid-cols-[1fr_112px_80px_80px_64px] border-b border-zinc-200 bg-zinc-100/40 dark:border-zinc-800 dark:bg-zinc-900/40 font-semibold text-zinc-500 dark:text-zinc-400 py-3.5 px-6 text-sm">
        <div>제목</div>
        <div className="text-center">작성자</div>
        <div className="text-center">작성일</div>
        <div className="text-center">조회</div>
        <div className="text-center">추천</div>
      </div>

      {/* Table Body rows using Link components styled with CSS Grid */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/board/${post.board_abbr}/${post.id}`}
            className="grid grid-cols-[1fr_112px_80px_80px_64px] items-center py-4 px-6 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer text-sm text-zinc-900 dark:text-zinc-100 group"
          >
            <div className="font-normal">
              <div className="flex items-center gap-1.5 max-w-lg">
                <span className="font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:underline transition-colors line-clamp-1">
                  {post.title}
                </span>
                {post.comments_count > 0 && (
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {post.comments_count}
                  </span>
                )}
              </div>
            </div>
            <div className="text-center text-zinc-600 dark:text-zinc-400 font-medium truncate">
              {post.users?.nickname || "익명"}
            </div>
            <div
              className="text-center text-zinc-400 dark:text-zinc-500 text-xs"
              title={new Date(post.created_at).toLocaleString()}
            >
              {formatTimeOrDate(post.created_at)}
            </div>
            <div className="text-center text-zinc-400 dark:text-zinc-500 text-xs font-medium">
              {post.views}
            </div>
            <div className="text-center text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
              {post.likes}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
