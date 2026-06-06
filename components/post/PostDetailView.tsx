"use client";

import Link from "next/link";
import type { Post } from "@/lib/queries/posts";
import { TiptapRenderer } from "@/components/tiptap/TiptapRenderer";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import ChatBubbleIcon from "@/components/icons/ChatBubbleIcon";

interface PostDetailViewProps {
  post: Post;
}

export default function PostDetailView({ post }: PostDetailViewProps) {
  const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <Link
        href={`/board/${post.board_abbr}`}
        className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ArrowLeftIcon className="h-4 w-4 transform transition-transform group-hover:-translate-x-0.5" />
        <span>목록으로 돌아가기</span>
      </Link>

      {/* Post Container */}
      <div className="space-y-6">
        {/* Post Header */}
        <div className="space-y-4">
          <h1 className="text-2xl leading-snug font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            {post.title}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 font-bold text-zinc-700 ring-2 ring-zinc-200/50 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700/30">
                {post.users?.nickname?.[0] || "익"}
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {post.users?.nickname || "익명"}
                </div>
                <div className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                  {formattedDate}
                </div>
              </div>
            </div>

            {/* View/Comment stats */}
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                조회수 {post.views}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ChatBubbleIcon className="h-4 w-4" />
                댓글 {post.comments_count}
              </span>
            </div>
          </div>
        </div>

        {/* Post Content Body */}
        <div className="border-b border-zinc-200/80 py-2 dark:border-zinc-800/80">
          <TiptapRenderer content={post.content} />
        </div>

        {/* Likes & Dislikes Votes Section */}
        <div className="flex justify-center gap-4 py-4">
          {/* Like Button */}
          <button className="group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-all hover:scale-105 hover:bg-zinc-100 hover:text-rose-500 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-rose-400">
            <HeartIcon className="h-6 w-6 transition-colors group-hover:fill-rose-500/20 group-hover:stroke-rose-500" />
            <span className="mt-1.5 text-sm font-semibold">{post.likes}</span>
          </button>

          {/* Dislike Button */}
          <button className="group flex h-20 w-20 flex-col items-center justify-center rounded-2xl border border-zinc-200/80 bg-zinc-50 text-zinc-600 transition-all hover:scale-105 hover:bg-zinc-100 hover:text-blue-500 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-900/80 dark:hover:text-blue-400">
            <HeartIcon className="h-6 w-6 rotate-180 transform transition-colors group-hover:fill-blue-500/20 group-hover:stroke-blue-500" />
            <span className="mt-1.5 text-sm font-semibold">{post.dislikes}</span>
          </button>
        </div>

        {/* Comments list placeholder */}
        <div className="space-y-6 pt-6">
          <h3 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            <ChatBubbleIcon className="h-5 w-5 text-indigo-500" />
            댓글 {post.comments_count}개
          </h3>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-8 text-center text-sm text-zinc-400 dark:border-zinc-800/80 dark:bg-zinc-900/20 dark:text-zinc-500">
            아직 등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!
          </div>
        </div>
      </div>
    </div>
  );
}
