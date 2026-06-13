"use client";

import { useEffect } from "react";

interface RecordVisitProps {
  board: {
    name: string;
    abbr: string;
  };
}

export default function RecordVisit({ board }: RecordVisitProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !board || !board.abbr || !board.name) return;

    const KEY = "recent-visited-boards";
    const stored = localStorage.getItem(KEY);
    let list: { name: string; abbr: string }[] = [];

    if (stored) {
      try {
        list = JSON.parse(stored);
      } catch {
        list = [];
      }
    }

    // 중복 제거 및 최신 진입 보드를 맨 앞으로 이동
    list = list.filter((item) => item.abbr !== board.abbr);
    list.unshift({ name: board.name, abbr: board.abbr });

    // 최대 5개로 제한
    list = list.slice(0, 5);

    localStorage.setItem(KEY, JSON.stringify(list));

    // 최근 방문 정보가 변경되었음을 전역 이벤트로 전파
    window.dispatchEvent(new Event("recent-visited-change"));
  }, [board]);

  return null;
}
