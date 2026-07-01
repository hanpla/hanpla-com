"use client";

import { useRecentBoards } from "@/hooks/use-recent-board";
import BoardList from "./board-list";
import TrashIcon from "@/components/icons/trash-icon";

const RecentBoard = () => {
  const { recentBoards, isMounted, isDeleteMode, handleDeleteBoard, toggleDeleteMode } =
    useRecentBoards();

  if (isMounted && recentBoards.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-600">
      <div className="wrapper flex items-center justify-between gap-3 overflow-hidden py-2">
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <span className="shrink-0 text-xs font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
            최근 방문
          </span>
          <div className="no-scrollbar flex flex-1 items-center gap-2 overflow-x-auto py-0.5">
            {isMounted && (
              <BoardList
                isMounted={isMounted}
                recentBoards={recentBoards}
                isDeleteMode={isDeleteMode}
                onDelete={handleDeleteBoard}
              />
            )}
          </div>
        </div>
        {isMounted && recentBoards.length > 0 && (
          <button
            onClick={toggleDeleteMode}
            title={isDeleteMode ? "삭제 모드 종료" : "방문 기록 삭제하기"}
            className="cursor-pointer"
          >
            <TrashIcon
              className={`h-5 w-5 ${isDeleteMode ? "text-red-500" : "text-zinc-400 hover:text-red-500"}`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentBoard;
