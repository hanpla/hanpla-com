"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useMount = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
