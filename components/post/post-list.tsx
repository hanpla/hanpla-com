import Link from "next/link";

import type { PostWithRelations } from "@/types/post";
import { formatDate } from "@/lib/utils/date";
import ChatBubbleIcon from "../icons/chat-bubble-icon";
import EyeIcon from "../icons/eye-icon";
import HeartIcon from "../icons/heart-icon";

interface PostListProps {
  posts: PostWithRelations[];
  showBoardBadge?: boolean;
  emptyMessage?: string;
}

export const PostList = ({ posts, showBoardBadge = false, emptyMessage }: PostListProps) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-16 text-center dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {emptyMessage || "게시글이 없습니다."}
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-100 border-y border-zinc-100 dark:divide-zinc-900 dark:border-zinc-900">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-1.5 py-3.5 text-sm">
          {/* 1. Title Row */}
          <div className="flex min-w-0 items-center justify-between gap-4">
            <Link
              href={`/boards/${post.board_abbr}/${post.id}`}
              className="flex min-w-0 items-center gap-1.5 font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              {showBoardBadge && (
                <span className="shrink-0 rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 uppercase dark:bg-zinc-800 dark:text-zinc-400">
                  {post.board_abbr}
                </span>
              )}
              <span className="line-clamp-1">{post.title}</span>
            </Link>

            {post.comments_count > 0 && (
              <div className="flex shrink-0 items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                <ChatBubbleIcon className="h-3.5 w-3.5" />
                <span>{post.comments_count}</span>
              </div>
            )}
          </div>

          {/* 2. Metadata Row */}
          <div className="flex items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
            {/* Left side: Author & Time */}
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="truncate font-medium text-zinc-600 dark:text-zinc-400">
                {post.author?.nickname ?? "익명"}
              </span>
              <span>•</span>
              <span className="shrink-0">{formatDate(post.created_at)}</span>
            </div>

            {/* Right side: Views & Likes */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex items-center gap-1">
                <EyeIcon className="h-3.5 w-3.5" />
                <span>{post.views}</span>
              </div>
              <div className="flex items-center gap-1">
                <HeartIcon className="h-3.5 w-3.5" />
                <span>{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostList;
