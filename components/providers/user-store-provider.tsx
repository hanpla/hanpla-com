"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useStore } from "zustand";

import { createUserStore, type UserStore, type UserState } from "@/stores/user-store";
import type { SessionUser } from "@/lib/utils/auth";

export const UserStoreContext = createContext<UserStore | null>(null);

interface UserStoreProviderProps {
  children: ReactNode;
  initialUser: SessionUser | null;
}

export const UserStoreProvider = ({ children, initialUser }: UserStoreProviderProps) => {
  const [store] = useState(() => createUserStore({ user: initialUser }));

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  );
};


export const useUserStore = <T,>(selector: (store: UserState) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error("useUserStore must be used within UserStoreProvider");
  }

  return useStore(userStoreContext, selector);
};
