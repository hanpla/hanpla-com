"use client";

import { useEffect } from "react";
import type { SessionUser } from "@/lib/utils/auth";
import { useUserStore } from "./user-store-provider";

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
