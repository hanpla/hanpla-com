"use client";

import { useState, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useMount } from "./useMount";

export interface VisitedBoard {
  name: string;
  abbr: string;
}

const KEY = "recent-visited-boards";
const MAX = 5;

export const useRecentBoards = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // 1. 범용 훅을 사용하여 상태와 변경 함수 획득 (초기값은 빈 배열)
  const [recentBoards, setRecentBoards] = useLocalStorage<VisitedBoard[]>(KEY, []);

  // 2. 새로고침 깜빡임 방지용 마운트 상태 감시
  const isMounted = useMount();

  // 3. 비즈니스 로직: 보드 추가 (순서 조정 및 5개 제한)
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

  // 4. 비즈니스 로직: 특정 보드 삭제
  const handleDeleteBoard = useCallback(
    (abbr: string) => {
      setRecentBoards((prev) => prev.filter((board) => board.abbr !== abbr));
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
}
