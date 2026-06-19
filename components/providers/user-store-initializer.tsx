"use client";

import { useEffect } from "react";
import { useUserStore } from "./user-store-provider";
import type { SessionUser } from "@/lib/utils/auth";

interface UserStoreInitializerProps {
  user: SessionUser | null;
}

export const UserStoreInitializer = ({ user }: UserStoreInitializerProps) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
};
