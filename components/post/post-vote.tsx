"use client";

import { useOptimistic, useTransition } from "react";

import { votePostAction } from "@/lib/actions/post";
import type { VoteType } from "@/types/post";
import ThumbsUpIcon from "@/components/icons/thumbs-up-icon";
import ThumbsDownIcon from "@/components/icons/thumbs-down-icon";

interface PostVoteProps {
  postId: number;
  likes: number;
  dislikes: number;
  initialUserVote?: VoteType;
  isLoggedIn?: boolean;
}

interface VoteState {
  likes: number;
  dislikes: number;
  userVote: VoteType;
}

// 헬퍼: 추천/비추천 클릭 시 변경될 수치 및 투표 상태 계산
const calcNextVote = (state: VoteState, targetVote: "like" | "dislike"): VoteState => {
  const { likes, dislikes, userVote } = state;

  if (userVote === targetVote) {
    return {
      userVote: null,
      likes: targetVote === "like" ? Math.max(0, likes - 1) : likes,
      dislikes: targetVote === "dislike" ? Math.max(0, dislikes - 1) : dislikes,
    };
  }

  if (userVote !== null) {
    return {
      userVote: targetVote,
      likes: targetVote === "like" ? likes + 1 : Math.max(0, likes - 1),
      dislikes: targetVote === "dislike" ? dislikes + 1 : Math.max(0, dislikes - 1),
    };
  }

  return {
    userVote: targetVote,
    likes: targetVote === "like" ? likes + 1 : likes,
    dislikes: targetVote === "dislike" ? dislikes + 1 : dislikes,
  };
};

export const PostVote = ({
  postId,
  likes,
  dislikes,
  initialUserVote = null,
  isLoggedIn = false,
}: PostVoteProps) => {
  const [isPending, startTransition] = useTransition();

  // React 19 내장 useOptimistic (낙관적 UI 및 자동 롤백 관리)
  const [optimisticState, setOptimisticState] = useOptimistic(
    { likes, dislikes, userVote: initialUserVote },
    (current: VoteState, targetVote: "like" | "dislike") => calcNextVote(current, targetVote)
  );

  const handleVote = (targetVote: "like" | "dislike") => {
    if (isPending) return;

    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    startTransition(async () => {
      setOptimisticState(targetVote);
      const res = await votePostAction(postId, targetVote);
      if (!res.success && res.error) {
        alert(res.error);
      }
    });
  };

  const voteButtons = [
    {
      type: "like" as const,
      label: "추천",
      count: optimisticState.likes,
      icon: ThumbsUpIcon,
      isActive: optimisticState.userVote === "like",
      activeClass:
        "border-zinc-900 bg-zinc-900 text-zinc-100 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-md",
      inactiveClass:
        "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400",
    },
    {
      type: "dislike" as const,
      label: "비추천",
      count: optimisticState.dislikes,
      icon: ThumbsDownIcon,
      isActive: optimisticState.userVote === "dislike",
      activeClass:
        "border-zinc-700 bg-zinc-700 text-zinc-100 dark:border-zinc-300 dark:bg-zinc-300 dark:text-zinc-900 shadow-md",
      inactiveClass:
        "border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400",
    },
  ];

  return (
    <div className="border-zinc-150 flex items-center justify-center gap-4 border-b py-8 dark:border-zinc-800/60">
      {voteButtons.map((btn) => {
        const Icon = btn.icon;
        return (
          <button
            key={btn.type}
            type="button"
            disabled={isPending}
            onClick={() => handleVote(btn.type)}
            className={`group flex h-20 w-20 flex-col items-center justify-center gap-1.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-60 ${
              btn.isActive ? btn.activeClass : btn.inactiveClass
            }`}
          >
            <Icon className="h-5 w-5 transition-colors" />
            <span
              className={`text-[10px] font-bold ${
                btn.isActive
                  ? "text-zinc-300 dark:text-zinc-700"
                  : "text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
              }`}
            >
              {btn.label}
            </span>
            <span
              className={`mt-[-2px] text-xs font-extrabold ${
                btn.isActive ? "text-white dark:text-zinc-950" : "text-zinc-800 dark:text-zinc-200"
              }`}
            >
              {btn.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PostVote;
