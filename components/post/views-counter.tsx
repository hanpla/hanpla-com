"use client";

import { useEffect } from "react";
import { incrementPostViews } from "@/lib/actions/post";

interface ViewsCounterProps {
  postId: number;
}

export const ViewsCounter = ({ postId }: ViewsCounterProps) => {
  useEffect(() => {
    try {
      const storageKey = "hanpla_viewed_posts";
      const sessionData = sessionStorage.getItem(storageKey);
      const viewedIds: number[] = sessionData ? JSON.parse(sessionData) : [];

      if (!viewedIds.includes(postId)) {
        // 비동기로 조회수 증가 Action 호출
        incrementPostViews(postId).then(() => {
          // 호출 성공/완료 시 세션 저장소에 추가하여 재조회 방지
          viewedIds.push(postId);
          sessionStorage.setItem(storageKey, JSON.stringify(viewedIds));
        });
      }
    } catch (error) {
      console.error("Failed to increment views client-side:", error);
    }
  }, [postId]);

  return null; // UI는 렌더링하지 않는 유틸리티 컴포넌트입니다.
};

export default ViewsCounter;
