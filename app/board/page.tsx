import { getBoards } from "@/lib/queries/board";
import { groupBoardsByCategory } from "@/lib/utils/board";
import BoardCategorySection from "@/components/board/BoardCategorySection";

export const metadata = {
  title: "전체 게시판 - hanpla-com",
  description: "분야별로 정리된 다양한 게시판들을 확인하세요.",
};

function BoardHeader() {
  return (
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        전체 게시판
      </h1>
      <p className="text-base text-zinc-500 dark:text-zinc-400">
        관심 있는 주제의 게시판을 찾아 이야기를 나누어 보세요.
      </p>
    </div>
  );
}

export default async function BoardListPage() {
  const boards = await getBoards();

  const { groupedBoards, categories } = groupBoardsByCategory(boards);

  return (
    <div className="bg-background text-foreground flex flex-1 flex-col py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="mx-auto w-full max-w-5xl space-y-12">
        <BoardHeader />

        {categories.length === 0 ? (
          <div className="animate-in fade-in rounded-2xl border border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
            <span className="block text-2xl">📭</span>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">등록된 게시판이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => (
              <BoardCategorySection
                key={category}
                category={category}
                boards={groupedBoards[category]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
