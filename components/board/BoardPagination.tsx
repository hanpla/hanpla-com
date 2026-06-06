export default function BoardPagination() {
  return (
    <div className="flex items-center justify-center gap-1">
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-foreground dark:text-zinc-600 dark:hover:text-zinc-300 font-medium transition-colors cursor-pointer">
        &lt;
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900 text-zinc-50 dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 text-sm font-semibold transition-colors cursor-pointer">
        1
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer">
        2
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer">
        3
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer">
        4
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm font-medium transition-colors cursor-pointer">
        5
      </button>
      <button className="px-3.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-foreground dark:text-zinc-600 dark:hover:text-zinc-300 font-medium transition-colors cursor-pointer">
        &gt;
      </button>
    </div>
  );
}
