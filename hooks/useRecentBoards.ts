"use client";

import { useState, useSyncExternalStore } from "react";

interface VisitedBoard {
  name: string;
  abbr: string;
}

const KEY = "recent-visited-boards";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("recent-visited-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("recent-visited-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = () => {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(KEY) || "[]";
};

const getServerSnapshot = () => {
  return "[]";
};

const emptySubscribe = () => () => {};

export function useRecentBoards() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const recentBoardsRaw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  let recentBoards: VisitedBoard[] = [];
  if (isMounted) {
    try {
      recentBoards = JSON.parse(recentBoardsRaw);
    } catch {
      recentBoards = [];
    }
  }

  const handleDeleteBoard = (abbr: string) => {
    const updated = recentBoards.filter((board) => board.abbr !== abbr);
    localStorage.setItem(KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("recent-visited-change"));
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode((prev) => !prev);
  };

  return {
    recentBoards,
    isMounted,
    isDeleteMode,
    handleDeleteBoard,
    toggleDeleteMode,
  };
}
