import { formatRelativeTime } from "@/lib/utils/time";
import type { Post } from "@/lib/queries/posts";
import EyeIcon from "@/components/icons/EyeIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";
import Link from "next/link";

interface BoardMobileStackProps {
  posts: Post[];
  searchParams?: {
    filter?: string;
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  };
  showBoardName?: boolean;
  isBestContext?: boolean;
}

export default function BoardMobileStack({
  posts,
  searchParams,
  showBoardName = false,
  isBestContext = false,
}: BoardMobileStackProps) {
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
    const baseRoute = isBestContext ? `/best/${post.id}` : `/board/${post.board_abbr}/${post.id}`;
    return `${baseRoute}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="block divide-y divide-zinc-200 md:hidden dark:divide-zinc-800">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={getPostLink(post)}
          className="block cursor-pointer space-y-2 p-4 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-zinc-900 transition-colors hover:text-indigo-600 dark:text-zinc-100 dark:hover:text-indigo-400">
              {showBoardName && post.boards && (
                <span className="mr-1.5 inline-block rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {post.boards.name}
                </span>
              )}
              {post.title}
            </h3>
            {post.comments_count > 0 && (
              <span className="flex shrink-0 items-center gap-0.5 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                <ChatBubbleIcon className="h-3 w-3" />
                {post.comments_count}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between pt-1 text-xs text-zinc-400 dark:text-zinc-500">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-zinc-700 dark:text-zinc-300">
                {post.users?.nickname || "익명"}
              </span>
              <span>•</span>
              <span>{formatRelativeTime(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-0.5">
                <EyeIcon className="h-3.5 w-3.5" />
                {post.views}
              </span>
              <span className="flex items-center gap-0.5 font-medium text-zinc-500 dark:text-zinc-400">
                <HeartIcon className="h-3.5 w-3.5" />
                {post.likes}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
