import Link from "next/link";

import type { PostWithRelations } from "@/types/post";
import ChatBubbleIcon from "@/components/icons/chat-bubble-icon";
import EyeIcon from "@/components/icons/eye-icon";
import HeartIcon from "@/components/icons/heart-icon";
import PostListHeader, { POST_GRID_COLS_CLASS } from "./post-list-header";

// ==========================================
// 1. 공통 서브 컴포넌트 (배지 및 행 UI 추상화)
// ==========================================

const BoardBadge = ({ name, className = "" }: { name: string; className?: string }) => (
  <span
    className={`shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 ${className}`}
  >
    {name}
  </span>
);

const CommentBadge = ({ count, isMobile = false }: { count: number; isMobile?: boolean }) => {
  if (count <= 0) return null;

  if (isMobile) {
    return (
      <span className="flex shrink-0 items-center gap-0.5 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
        <ChatBubbleIcon className="h-3 w-3" />
        {count}
      </span>
    );
  }

  return (
    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      {count}
    </span>
  );
};

interface PostRowProps {
  post: PostWithRelations;
  href: string;
  showBoardName: boolean;
}

// PC 뷰포트용 개별 행 컴포넌트
const PostRowPc = ({ post, href, showBoardName }: PostRowProps) => {
  const author = post.users?.nickname || "익명";
  const boardName = post.boards?.name;

  return (
    <Link
      href={href}
      className={`group grid cursor-pointer ${POST_GRID_COLS_CLASS} items-center py-4 text-sm text-zinc-900 transition-colors hover:bg-zinc-100/50 dark:text-zinc-100 dark:hover:bg-zinc-800/30`}
    >
      <div className="font-normal">
        <div className="flex max-w-lg items-center gap-2">
          {showBoardName && boardName && <BoardBadge name={boardName} />}
          <span className="line-clamp-1 font-medium transition-colors group-hover:text-indigo-600 group-hover:underline dark:group-hover:text-indigo-400">
            {post.title}
          </span>
          <CommentBadge count={post.comments_count} />
        </div>
      </div>
      <div className="truncate text-center font-medium text-zinc-600 dark:text-zinc-400">
        {author}
      </div>
      <div
        className="text-center text-xs text-zinc-400 dark:text-zinc-500"
        title={new Date(post.created_at).toLocaleString()}
      >
        {post.formattedTime || post.created_at.split("T")[0]}
      </div>
      <div className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
        {post.views}
      </div>
      <div className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        {post.likes}
      </div>
    </Link>
  );
};

// 모바일 뷰포트용 개별 행 컴포넌트
const PostRowMobile = ({ post, href, showBoardName }: PostRowProps) => {
  const author = post.users?.nickname || "익명";
  const boardName = post.boards?.name;

  return (
    <Link
      href={href}
      className="block cursor-pointer space-y-2 py-4 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-zinc-900 transition-colors hover:text-indigo-600 dark:text-zinc-100 dark:hover:text-indigo-400">
          {showBoardName && boardName && (
            <BoardBadge name={boardName} className="mr-1.5 inline-block text-[9px]" />
          )}
          {post.title}
        </h3>
        <CommentBadge count={post.comments_count} isMobile />
      </div>
      <div className="flex items-center justify-between pt-1 text-xs text-zinc-400 dark:text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{author}</span>
          <span>•</span>
          <span>{post.formattedRelativeTime || post.created_at.split("T")[0]}</span>
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
  );
};

// ==========================================
// 2. 메인 UI 내보내기 컴포넌트
// ==========================================

interface PostListUiProps {
  posts: PostWithRelations[];
  showBoardName?: boolean;
  getPostLink?: (post: PostWithRelations) => string;
}

const defaultGetPostLink = (post: PostWithRelations) => `/board/${post.board_abbr}/${post.id}`;

const PostListUi = ({
  posts,
  showBoardName = false,
  getPostLink = defaultGetPostLink,
}: PostListUiProps) => {
  return (
    <>
      {/* PC View (md 이상) */}
      <div className="hidden md:block">
        {/* Table Header using CSS Grid */}
        <PostListHeader />

        {/* Table Body rows */}
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {posts.map((post) => (
            <PostRowPc
              key={post.id}
              post={post}
              href={getPostLink(post)}
              showBoardName={showBoardName}
            />
          ))}
        </div>
      </div>

      {/* Mobile View (md 미만) */}
      <div className="block divide-y divide-zinc-200 md:hidden dark:divide-zinc-800">
        {posts.map((post) => (
          <PostRowMobile
            key={post.id}
            post={post}
            href={getPostLink(post)}
            showBoardName={showBoardName}
          />
        ))}
      </div>
    </>
  );
};

export default PostListUi;
