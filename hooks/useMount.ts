"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useMount = (): boolean => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
