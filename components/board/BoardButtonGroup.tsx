import PenIcon from "@/components/icons/PenIcon";

export default function BoardButtonGroup() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer">
          전체글
        </button>
        <button className="px-4 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer">
          인기글
        </button>
      </div>
      <button className="px-4 py-2 text-sm font-semibold rounded-lg border border-zinc-300 dark:border-zinc-700 bg-background text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer">
        <PenIcon className="h-4 w-4" />
        글쓰기
      </button>
    </div>
  );
}
