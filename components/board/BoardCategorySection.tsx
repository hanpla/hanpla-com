import BoardCard from "./BoardCard";
import type { Board } from "@/lib/queries/board";

interface BoardCategorySectionProps {
  category: string;
  boards: Board[];
}

export default function BoardCategorySection({ category, boards }: BoardCategorySectionProps) {
  return (
    <section className="space-y-4">
      {/* Category Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {category}
        </h2>
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/80" />
      </div>

      {/* Boards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {boards.map((board) => (
          <BoardCard key={board.abbr} board={board} />
        ))}
      </div>
    </section>
  );
}
