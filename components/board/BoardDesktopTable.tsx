import { formatTimeOrDate } from "@/lib/utils/time";
import type { MockPost } from "@/lib/mocks/posts";

interface BoardDesktopTableProps {
  posts: MockPost[];
}

export default function BoardDesktopTable({ posts }: BoardDesktopTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-100/40 dark:border-zinc-800 dark:bg-zinc-900/40 font-semibold text-zinc-500 dark:text-zinc-400">
            <th className="py-3.5 px-5 w-16 text-center">번호</th>
            <th className="py-3.5 px-4">제목</th>
            <th className="py-3.5 px-4 w-28 text-center">작성자</th>
            <th className="py-3.5 px-4 w-20 text-center">작성일</th>
            <th className="py-3.5 px-4 w-20 text-center">조회</th>
            <th className="py-3.5 px-4 w-16 text-center">추천</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {posts.map((post, idx) => (
            <tr
              key={post.id}
              className="hover:bg-zinc-100/30 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer group"
            >
              <td className="py-4 px-5 text-center text-zinc-400 dark:text-zinc-500 font-medium">
                {posts.length - idx}
              </td>
              <td className="py-4 px-4 font-normal">
                <div className="space-y-0.5 max-w-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors line-clamp-1">
                      {post.title}
                    </span>
                    {post.comments_count > 0 && (
                      <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        {post.comments_count}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-1">
                    {post.content}
                  </p>
                </div>
              </td>
              <td className="py-4 px-4 text-center text-zinc-600 dark:text-zinc-400 font-medium truncate">
                {post.author}
              </td>
              <td
                className="py-4 px-4 text-center text-zinc-400 dark:text-zinc-500 text-xs"
                title={new Date(post.created_at).toLocaleString()}
              >
                {formatTimeOrDate(post.created_at)}
              </td>
              <td className="py-4 px-4 text-center text-zinc-400 dark:text-zinc-500 text-xs font-medium">
                {post.views}
              </td>
              <td className="py-4 px-4 text-center text-zinc-500 dark:text-zinc-400 text-xs font-semibold">
                {post.likes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
