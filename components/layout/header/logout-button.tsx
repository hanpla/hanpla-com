"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/logout";

interface LogoutButtonProps {
  className?: string;
  onLogoutSuccess?: () => void;
}

const DEFAULT_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors cursor-pointer text-left focus:outline-none";

const LogoutButton = ({ className, onLogoutSuccess }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const isConfirm = window.confirm("로그아웃 하시겠습니까?");
    if (!isConfirm) return;

    await logout();
    window.alert("로그아웃 되었습니다.");
    
    if (onLogoutSuccess) {
      onLogoutSuccess();
    }
    
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className={className || DEFAULT_STYLE}>
      로그아웃
    </button>
  );
};

export default LogoutButton;
