"use client";

import { useSyncExternalStore, useCallback, useMemo, useRef, useEffect } from "react";

const getStorageEventName = (key: string) => `local-storage-${key}`;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  const initialSerialized = JSON.stringify(initialValue);

  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};

      const eventName = getStorageEventName(key);
      window.addEventListener(eventName, callback);
      window.addEventListener("storage", callback);

      return () => {
        window.removeEventListener(eventName, callback);
        window.removeEventListener("storage", callback);
      };
    },
    [key]
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return initialSerialized;
    }
    const item = localStorage.getItem(key);
    return item !== null ? item : initialSerialized;
  }, [key, initialSerialized]);

  const getServerSnapshot = useCallback(() => {
    return initialSerialized;
  }, [initialSerialized]);

  const rawState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const state: T = useMemo(() => {
    try {
      return JSON.parse(rawState);
    } catch {
      return JSON.parse(initialSerialized);
    }
  }, [rawState, initialSerialized]);

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const setState = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        let currentVal: T = stateRef.current;
        if (typeof window !== "undefined") {
          const item = localStorage.getItem(key);
          if (item !== null) {
            try {
              currentVal = JSON.parse(item);
            } catch {}
          }
        }

        const nextValue = value instanceof Function ? value(currentVal) : value;
        localStorage.setItem(key, JSON.stringify(nextValue));

        window.dispatchEvent(new Event(getStorageEventName(key)));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [state, setState];
};
