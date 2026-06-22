"use client";

import { createContext, useContext, ReactNode } from "react";
import type { SessionUser } from "@/types/auth";

interface SessionContextType {
  user: SessionUser | null;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
  children: ReactNode;
  user: SessionUser | null;
}

export const SessionProvider = ({ children, user }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession은 SessionProvider 안에서 사용되어야 합니다.");
  }
  return context;
};
