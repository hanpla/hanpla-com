"use client";

import Link from "next/link";
import React from "react";
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
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {/* Header Navigation */}
        <Link
          href={`/board/${post.board_abbr}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
          <span>목록으로 돌아가기</span>
        </Link>

        {/* Post Container */}
        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Post Header */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-snug">
              {post.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-300 ring-2 ring-zinc-200/50 dark:ring-zinc-700/30">
                  {post.users?.nickname?.[0] || "익"}
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {post.users?.nickname || "익명"}
                  </div>
                  <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {formattedDate}
                  </div>
                </div>
              </div>

              {/* View/Comment stats */}
              <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 font-medium">
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
          <div className="py-2 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <TiptapRenderer content={post.content} />
          </div>

          {/* Likes & Dislikes Votes Section */}
          <div className="flex justify-center gap-4 py-4">
            {/* Like Button */}
            <button className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all hover:scale-105 active:scale-95 group">
              <HeartIcon className="h-6 w-6 group-hover:fill-rose-500/20 group-hover:stroke-rose-500 transition-colors" />
              <span className="text-sm font-semibold mt-1.5">{post.likes}</span>
            </button>

            {/* Dislike Button */}
            <button className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-105 active:scale-95 group">
              <HeartIcon className="h-6 w-6 transform rotate-180 group-hover:fill-blue-500/20 group-hover:stroke-blue-500 transition-colors" />
              <span className="text-sm font-semibold mt-1.5">{post.dislikes}</span>
            </button>
          </div>

          {/* Comments list placeholder */}
          <div className="pt-6 space-y-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <ChatBubbleIcon className="h-5 w-5 text-indigo-500" />
              댓글 {post.comments_count}개
            </h3>

            <div className="rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/80 dark:border-zinc-800/80 p-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
              아직 등록된 댓글이 없습니다. 첫 댓글을 남겨보세요!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
