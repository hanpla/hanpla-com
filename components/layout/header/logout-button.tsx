"use client";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/actions/logout";

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={`${LINK_STYLE} cursor-pointer`}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
