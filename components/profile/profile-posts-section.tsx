"use client";

import { ReactNode } from "react";
import Link from "next/link";

import { formatDate } from "@/lib/utils/date";
import useProfilePosts, { SubTab } from "@/hooks/use-profile-posts";
import type { PostWithRelations } from "@/types/post";
import type { UserCommentWithPost } from "@/types/comment";
import Pagination from "@/components/ui/pagination";
import ProfilePostsSkeleton from "./profile-posts-skeleton";

interface ProfilePostsSectionProps {
  userId: string;
}

interface TabItem {
  id: SubTab;
  label: string;
}

const SUB_TABS: TabItem[] = [
  { id: "posts", label: "작성한 게시글" },
  { id: "comments", label: "작성한 댓글" },
];

const ITEM_CARD_CLASS =
  "group flex flex-col gap-1.5 rounded-lg border border-zinc-200/80 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700";
const ITEM_HEADER_CLASS = "flex items-center justify-between gap-2";
const ITEM_DATE_CLASS = "text-xs text-zinc-400 dark:text-zinc-500";
const SUB_TAB_BASE_CLASS =
  "cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all";
const SUB_TAB_ACTIVE_CLASS = "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900";
const SUB_TAB_INACTIVE_CLASS =
  "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700";

// 공통 목록 카드 레이아웃 서브컴포넌트
interface ProfileListItemCardProps {
  href: string;
  headerLeft: ReactNode;
  date: string;
  content: ReactNode;
  footerMeta?: ReactNode;
}

const ProfileListItemCard = ({
  href,
  headerLeft,
  date,
  content,
  footerMeta,
}: ProfileListItemCardProps) => (
  <Link href={href} className={ITEM_CARD_CLASS}>
    <div className={ITEM_HEADER_CLASS}>
      {headerLeft}
      <span className={ITEM_DATE_CLASS}>{date}</span>
    </div>
    {content}
    {footerMeta ? (
      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        {footerMeta}
      </div>
    ) : null}
  </Link>
);

const EmptyListNotice = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
      💬
    </div>
    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{message}</p>
  </div>
);

const PostItem = ({ post }: { post: PostWithRelations }) => {
  const targetHref = `/boards/${post.board_abbr}/${post.id}`;

  return (
    <ProfileListItemCard
      href={targetHref}
      headerLeft={
        <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {post.board_abbr}
        </span>
      }
      date={formatDate(post.created_at, "YYYY.MM.DD")}
      content={
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
          {post.title}
        </h3>
      }
      footerMeta={
        <>
          <span>조회 {post.views}</span>
          <span>추천 {post.likes}</span>
          <span>댓글 {post.comments_count}</span>
        </>
      }
    />
  );
};

const CommentItem = ({ comment }: { comment: UserCommentWithPost }) => {
  const targetHref = comment.post ? `/boards/${comment.post.board_abbr}/${comment.post_id}` : "#";

  return (
    <ProfileListItemCard
      href={targetHref}
      headerLeft={
        <span className="line-clamp-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          원문: {comment.post ? comment.post.title : "삭제된 게시글"}
        </span>
      }
      date={formatDate(comment.created_at, "YYYY.MM.DD")}
      content={
        <p className="line-clamp-2 text-sm text-zinc-800 group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-blue-400">
          {comment.content}
        </p>
      }
    />
  );
};

const ProfilePostsSection = ({ userId }: ProfilePostsSectionProps) => {
  const {
    subTab,
    currentPage,
    posts,
    comments,
    totalCount,
    pageSize,
    isLoading,
    handleSubTabChange,
    handlePageChange,
  } = useProfilePosts(userId);

  if (isLoading) {
    return <ProfilePostsSkeleton />;
  }

  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
      {/* 서브 탭 토글 */}
      <div className="flex gap-2 border-b border-zinc-200 pb-3 dark:border-zinc-800">
        {SUB_TABS.map((tab) => {
          const isActive = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSubTabChange(tab.id)}
              className={`${SUB_TAB_BASE_CLASS} ${
                isActive ? SUB_TAB_ACTIVE_CLASS : SUB_TAB_INACTIVE_CLASS
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 목록 렌더링 */}
      {subTab === "posts" ? (
        posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyListNotice message="작성한 게시글이 없습니다." />
        )
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <EmptyListNotice message="작성한 댓글이 없습니다." />
      )}

      {/* 공통 페이지네이션 재사용 */}
      {totalCount > pageSize ? (
        <div className="pt-2">
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePostsSection;
