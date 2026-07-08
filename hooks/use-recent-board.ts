"use client";

import { useState, useCallback } from "react";

import { useLocalStorage } from "./use-local-storage";
import { useMount } from "./use-mount";

export interface VisitedBoard {
  name: string;
  abbr: string;
}

const KEY = "recent-visited-boards";
const MAX = 5;

export const useRecentBoards = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [recentBoards, setRecentBoards] = useLocalStorage<VisitedBoard[]>(KEY, []);
  const isMounted = useMount();

  const addBoard = useCallback(
    (board: VisitedBoard) => {
      if (!board || !board.abbr || !board.name) return;
      setRecentBoards((prev) => {
        const filtered = prev.filter((item) => item.abbr !== board.abbr);
        return [board, ...filtered].slice(0, MAX);
      });
    },
    [setRecentBoards]
  );

  const handleDeleteBoard = useCallback(
    (abbr: string) => {
      setRecentBoards((prev) => {
        const next = prev.filter((board) => board.abbr !== abbr);
        if (next.length === 0) {
          setIsDeleteMode(false);
        }
        return next;
      });
    },
    [setRecentBoards]
  );

  const toggleDeleteMode = useCallback(() => {
    setIsDeleteMode((prev) => !prev);
  }, []);

  return {
    recentBoards,
    isMounted,
    isDeleteMode,
    addBoard,
    handleDeleteBoard,
    toggleDeleteMode,
  };
};
