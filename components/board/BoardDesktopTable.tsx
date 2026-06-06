import { formatTimeOrDate } from "@/lib/utils/time";
import type { Post } from "@/lib/queries/posts";
import Link from "next/link";

interface BoardDesktopTableProps {
  posts: Post[];
  searchParams?: {
    filter?: string;
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  };
}

export default function BoardDesktopTable({ posts, searchParams }: BoardDesktopTableProps) {
  const getPostLink = (post: Post) => {
    const params = new URLSearchParams();
    if (searchParams) {
      if (searchParams.filter === "popular") {
        params.set("filter", "popular");
      }
      if (searchParams.page) {
        params.set("page", searchParams.page);
      }
      if (searchParams.searchType && searchParams.searchKeyword) {
        params.set("searchType", searchParams.searchType);
        params.set("searchKeyword", searchParams.searchKeyword);
      }
    }
    const queryStr = params.toString();
    return `/board/${post.board_abbr}/${post.id}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="hidden md:block">
      {/* Table Header using CSS Grid */}
      <div className="grid grid-cols-[1fr_112px_80px_80px_64px] border-b border-zinc-200 bg-zinc-100/40 px-6 py-3.5 text-sm font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
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
            href={getPostLink(post)}
            className="group grid cursor-pointer grid-cols-[1fr_112px_80px_80px_64px] items-center px-6 py-4 text-sm text-zinc-900 transition-colors hover:bg-zinc-100/50 dark:text-zinc-100 dark:hover:bg-zinc-800/30"
          >
            <div className="font-normal">
              <div className="flex max-w-lg items-center gap-1.5">
                <span className="line-clamp-1 font-medium transition-colors group-hover:text-indigo-600 group-hover:underline dark:group-hover:text-indigo-400">
                  {post.title}
                </span>
                {post.comments_count > 0 && (
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {post.comments_count}
                  </span>
                )}
              </div>
            </div>
            <div className="truncate text-center font-medium text-zinc-600 dark:text-zinc-400">
              {post.users?.nickname || "익명"}
            </div>
            <div
              className="text-center text-xs text-zinc-400 dark:text-zinc-500"
              title={new Date(post.created_at).toLocaleString()}
            >
              {formatTimeOrDate(post.created_at)}
            </div>
            <div className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {post.views}
            </div>
            <div className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {post.likes}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
