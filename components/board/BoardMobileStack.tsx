import { formatRelativeTime } from "@/lib/utils/time";
import type { Post } from "@/lib/queries/posts";
import EyeIcon from "@/components/icons/EyeIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";
import Link from "next/link";

interface BoardMobileStackProps {
  posts: Post[];
}

export default function BoardMobileStack({ posts }: BoardMobileStackProps) {
  return (
    <div className="block md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/board/${post.board_abbr}/${post.id}`}
          className="block p-4 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer space-y-2"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2 text-sm leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {post.title}
            </h3>
            {post.comments_count > 0 && (
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 flex items-center gap-0.5 shrink-0">
                <ChatBubbleIcon className="h-3 w-3" />
                {post.comments_count}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 pt-1">
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
