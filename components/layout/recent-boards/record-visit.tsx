"use client";

import { useEffect } from "react";
import { useRecentBoards } from "@/hooks/useRecentBoards";

interface RecordVisitProps {
  board: {
    name: string;
    abbr: string;
  };
}

const RecordVisit = ({ board }: RecordVisitProps) => {
  const { addBoard } = useRecentBoards();

  useEffect(() => {
    addBoard(board);
  }, [board, addBoard]); // board가 바뀔 때 최근 본 게시판 목록에 기록

  return null;
};

export default RecordVisit;

