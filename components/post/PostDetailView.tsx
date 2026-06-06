"use client";

import React from "react";
import type { Post } from "@/lib/queries/posts";
import { TiptapRenderer } from "@/components/tiptap/TiptapRenderer";
import { formatFullDateTime } from "@/lib/utils/time";
import EyeIcon from "@/components/icons/EyeIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";

interface PostDetailViewProps {
  post: Post;
}

// 겹치는 Tailwind 속성 및 스타일 상수 분리
const BORDER_COLOR = "border-zinc-200/80 dark:border-zinc-800/80";
const TEXT_MUTED = "text-zinc-400 dark:text-zinc-500";

const VOTE_BUTTON_BASE =
  `group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border ${BORDER_COLOR} ` +
  "bg-zinc-50 text-zinc-600 transition-all hover:scale-105 hover:bg-zinc-100 active:scale-95 " +
  "dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-900/80";

interface PostHeaderProps {
  title: string;
  nickname: string;
  formattedDate: string;
  views: number;
  commentsCount: number;
}

// 1. Post Header component (Metadata and title)
const PostHeader = ({ title, nickname, formattedDate, views, commentsCount }: PostHeaderProps) => (
  <div className="space-y-4">
    <h1 className="text-2xl leading-snug font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
      {title}
    </h1>

    <div
      className={`flex flex-wrap items-center justify-between gap-4 border-b ${BORDER_COLOR} pb-5`}
    >
      {/* Author and Date */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-700 ring-2 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700/30">
          {nickname?.[0] || "익"}
        </div>
        <div>
          <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{nickname}</div>
          <div className={`mt-0.5 text-xs ${TEXT_MUTED}`}>{formattedDate}</div>
        </div>
      </div>

      {/* Stats */}
      <div className={`flex items-center gap-3 text-xs font-medium ${TEXT_MUTED}`}>
        <span className="flex items-center gap-1">
          <EyeIcon className="h-4 w-4" />
          조회수 {views}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <ChatBubbleIcon className="h-4 w-4" />
          댓글 {commentsCount}
        </span>
      </div>
    </div>
  </div>
);

interface VoteButtonProps {
  count: number;
  type: "like" | "dislike";
}

// 2. Individual Vote Button helper component
const VoteButton = ({ count, type }: VoteButtonProps) => {
  const isLike = type === "like";

  const hoverTextColor = isLike
    ? "hover:text-rose-500 dark:hover:text-rose-400"
    : "hover:text-blue-500 dark:hover:text-blue-400";

  const fillStrokeColor = isLike
    ? "group-hover:fill-rose-500/20 group-hover:stroke-rose-500"
    : "group-hover:fill-blue-500/20 group-hover:stroke-blue-500";

  const rotation = isLike ? "" : "rotate-180 transform";

  return (
    <button className={`${VOTE_BUTTON_BASE} ${hoverTextColor}`}>
      <HeartIcon className={`h-6 w-6 transition-colors ${rotation} ${fillStrokeColor}`} />
      <span className="mt-1.5 text-sm font-semibold">{count}</span>
    </button>
  );
};

interface PostVotesProps {
  likes: number;
  dislikes: number;
}

// 3. Post Recommendation (Votes) section
const PostVotes = ({ likes, dislikes }: PostVotesProps) => (
  <div className="flex justify-center gap-4 py-4">
    <VoteButton count={likes} type="like" />
    <VoteButton count={dislikes} type="dislike" />
  </div>
);

interface PostCommentsProps {
  count: number;
}

// 4. Comments section
const PostComments = ({ count }: PostCommentsProps) => (
  <div className="space-y-6 pt-6">
    <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
      <ChatBubbleIcon className="h-5 w-5 text-indigo-500" />
      댓글 {count}개
    </h3>

    <div
      className={`rounded-xl border ${BORDER_COLOR} bg-zinc-50/50 p-8 text-center text-sm ${TEXT_MUTED} dark:bg-zinc-900/20`}
    >
      아직 등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!
    </div>
  </div>
);

// Main Component
export default function PostDetailView({ post }: PostDetailViewProps) {
  const formattedDate = formatFullDateTime(post.created_at);

  return (
    <div className="space-y-6">
      <PostHeader
        title={post.title}
        nickname={post.users?.nickname || "익명"}
        formattedDate={formattedDate}
        views={post.views}
        commentsCount={post.comments_count}
      />

      {/* Post Content Body */}
      <div className={`border-b ${BORDER_COLOR} py-2`}>
        <TiptapRenderer content={post.content} />
      </div>

      <PostVotes likes={post.likes} dislikes={post.dislikes} />

      <PostComments count={post.comments_count} />
    </div>
  );
}
