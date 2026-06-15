"use client";

import { useSyncExternalStore, useCallback } from "react";

// 키별로 독립된 이벤트를 발생시키기 위한 이름 생성 헬퍼
const getStorageEventName = (key: string) => `local-storage-${key}`;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  
  // 1. 이벤트 구독 (동일 탭 내 변경 알림 + 다른 탭 storage 이벤트 대응)
  const subscribe = useCallback((callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    
    const eventName = getStorageEventName(key);
    window.addEventListener(eventName, callback);
    window.addEventListener("storage", callback);
    
    return () => {
      window.removeEventListener(eventName, callback);
      window.removeEventListener("storage", callback);
    };
  }, [key]);

  // 2. 현재 로컬스토리지 원시 값(문자열) 가져오기
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return JSON.stringify(initialValue);
    }
    const item = localStorage.getItem(key);
    return item !== null ? item : JSON.stringify(initialValue);
  }, [key, initialValue]);

  // 3. 서버 사이드 렌더링(SSR) 대응 초기값 반환
  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  // 문자열 상태 구독 (참조값 변화로 인한 무한 리렌더링을 막기 위해 원시 string 감시)
  const rawState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // 파싱된 실제 값
  const state: T = (() => {
    try {
      return JSON.parse(rawState);
    } catch {
      return initialValue;
    }
  })();

  // 4. 로컬스토리지 값 변경 및 이벤트 발송 함수
  const setState = useCallback((value: T | ((val: T) => T)) => {
    try {
      let currentVal: T = state;
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        if (item !== null) {
          try {
            currentVal = JSON.parse(item);
          } catch {
            // 파싱 실패 시 훅 상태의 값을 유지
          }
        }
      }
      
      const nextValue = value instanceof Function ? value(currentVal) : value;
      localStorage.setItem(key, JSON.stringify(nextValue));
      
      // 현재 탭 내의 리스너들에게 변경 전파
      window.dispatchEvent(new Event(getStorageEventName(key)));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}
