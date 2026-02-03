import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";

// Types
import { BoardType } from "@/libs/types/board";

const MAX_SAVE_ITEM = 10;
const STORAGE_KEY = "recent-board";

export function useRecentBoards(allBoards: BoardType[]) {
  const { abbr } = useParams();
  const [recentBoards, setRecentBoards] = useState<BoardType[]>([]);
  const boardMap = useMemo(() => {
    return new Map(allBoards.map((board) => [board.abbr, board]));
  }, [allBoards]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecentBoards(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!abbr || allBoards.length === 0) return;
    if (recentBoards[0]?.abbr === abbr) return;

    const currentBoard = boardMap.get(abbr as string);
    if (!currentBoard) return;

    setRecentBoards((prev) => {
      const filtered = prev.filter((item) => item.abbr !== abbr);
      const updated = [currentBoard, ...filtered].slice(0, MAX_SAVE_ITEM);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [abbr, allBoards]);

  const removeRecentBoard = (abbrToRemove: string) => {
    setRecentBoards((prev) => {
      const updated = prev.filter((b) => b.abbr !== abbrToRemove);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { recentBoards, removeRecentBoard };
}
