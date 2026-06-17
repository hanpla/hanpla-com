"use client";

import Link from "next/link";
import { useRecentBoards } from "@/hooks/useRecentBoards";
import TrashIcon from "@/components/icons/trash-icon";
import CloseIcon from "@/components/icons/close-icon";

interface VisitedBoard {
  name: string;
  abbr: string;
}

interface BoardChipProps {
  board: VisitedBoard;
  isDeleteMode: boolean;
  onDelete: (abbr: string) => void;
}

const CHIP_BASE_CLASS =
  "inline-flex items-center text-xs font-semibold px-3 py-1 transition-all duration-200 active:scale-95";

const CHIP_DELETE_CLASS =
  "gap-1.5 cursor-pointer rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 dark:border-red-950 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 animate-pulse";

const CHIP_NORMAL_CLASS =
  "rounded-full border border-zinc-200/80 bg-zinc-50/50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200";

const BoardChip = ({ board, isDeleteMode, onDelete }: BoardChipProps) => {
  if (isDeleteMode) {
    return (
      <button
        onClick={() => onDelete(board.abbr)}
        className={`${CHIP_BASE_CLASS} ${CHIP_DELETE_CLASS}`}
        title={`${board.name} 기록 삭제`}
      >
        <span>{board.name}</span>
        <CloseIcon className="h-3 w-3" strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <Link
      href={`/board/${board.abbr}`}
      className={`${CHIP_BASE_CLASS} ${CHIP_NORMAL_CLASS}`}
    >
      {board.name}
    </Link>
  );
};

const RecentBoardsBar = () => {
  const {
    recentBoards,
    isMounted,
    isDeleteMode,
    handleDeleteBoard,
    toggleDeleteMode,
  } = useRecentBoards();

  const trashButtonClass = `flex cursor-pointer items-center justify-center p-1.5 rounded-lg transition-all duration-200 active:scale-95 ${
    isDeleteMode
      ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 ring-2 ring-red-300/30"
      : "text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:text-zinc-500 dark:hover:text-red-400 dark:hover:bg-red-950/20"
  }`;

  return (
    <div className="sticky top-16 z-20 w-full border-b border-zinc-200/60 bg-white/60 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/60 transition-all">
      <div className="wrapper flex h-12 items-center justify-between gap-4">
        {/* 왼쪽 영역: 최근 방문 리스트 (마운트 전에도 뼈대는 상시 노출) */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <span className="shrink-0 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            최근 방문
          </span>

          <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {isMounted ? (
              recentBoards.length === 0 ? (
                <span className="text-xs font-medium text-zinc-400/80 dark:text-zinc-600/80">
                  최근 방문한 게시판이 없습니다.
                </span>
              ) : (
                recentBoards.map((board) => (
                  <BoardChip
                    key={board.abbr}
                    board={board}
                    isDeleteMode={isDeleteMode}
                    onDelete={handleDeleteBoard}
                  />
                ))
              )
            ) : (
              // 마운트 전 레이아웃 높이 및 구조 유지를 위한 빈 스플레이스홀더
              <span className="h-6 w-1" />
            )}
          </div>
        </div>

        {/* 오른쪽 영역: 휴지통 아이콘 (마운트 후 리스트가 존재할 때만 활성화) */}
        {isMounted && recentBoards.length > 0 && (
          <button
            onClick={toggleDeleteMode}
            className={trashButtonClass}
            title={isDeleteMode ? "삭제 모드 종료" : "방문 기록 삭제하기"}
          >
            <TrashIcon className={`h-5 w-5 ${isDeleteMode ? "animate-pulse" : ""}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecentBoardsBar;

