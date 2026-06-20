import { getBoards } from "@/lib/queries/board";
import { groupBoardsByCategory } from "@/lib/utils/board";
import { BoardCard } from "./board-card";

export const BoardList = async () => {
  const boards = await getBoards();

  if (boards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-200 py-16 text-center dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">등록된 게시판이 없습니다.</p>
      </div>
    );
  }

  const { groupedBoards, categories } = groupBoardsByCategory(boards);

  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const categoryBoards = groupedBoards[category] || [];
        return (
          <section key={category} className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-1 rounded bg-zinc-900 dark:bg-zinc-100" />
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                {category}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryBoards.map((board) => (
                <BoardCard key={board.abbr} board={board} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};
