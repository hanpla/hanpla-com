import ThumbsUpIcon from "@/components/icons/thumbs-up-icon";
import ThumbsDownIcon from "@/components/icons/thumbs-down-icon";

interface PostVoteProps {
  likes: number;
  dislikes: number;
}

export const PostVote = ({ likes, dislikes }: PostVoteProps) => {
  const voteButtons = [
    {
      type: "up",
      label: "추천",
      count: likes,
      icon: ThumbsUpIcon,
      hoverColorClass: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    },
    {
      type: "down",
      label: "비추천",
      count: dislikes,
      icon: ThumbsDownIcon,
      hoverColorClass: "group-hover:text-red-600 dark:group-hover:text-red-400",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4 py-8 border-b border-zinc-150 dark:border-zinc-800/60">
      {voteButtons.map((btn) => {
        const Icon = btn.icon;
        return (
          <button
            key={btn.type}
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 w-20 h-20 rounded-2xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 transition-all hover:scale-105 active:scale-95 group text-zinc-600 dark:text-zinc-400 cursor-pointer"
          >
            <Icon className={`h-5 w-5 transition-colors ${btn.hoverColorClass}`} />
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
              {btn.label}
            </span>
            <span className="text-xs font-extrabold text-zinc-800 dark:text-zinc-200 mt-[-2px]">
              {btn.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PostVote;
