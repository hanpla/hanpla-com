import { createStore } from "zustand";

import type { SessionUser } from "@/lib/utils/auth";

export interface UserState {
  user: SessionUser | null;
  setUser: (user: SessionUser | null) => void;
}

export const createUserStore = (initProps?: Partial<UserState>) =>
  createStore<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    ...initProps,
  }));

export type UserStore = ReturnType<typeof createUserStore>;
