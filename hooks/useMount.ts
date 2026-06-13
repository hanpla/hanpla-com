"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useMount(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
