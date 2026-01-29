"use client";

import { useSearchParams } from "next/navigation";

// Actions
import { logoutAction } from "@/libs/actions/auth";

export default function LogoutBtn({ className = "" }: { className?: string }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleBtnClick = async () => {
    await logoutAction(callbackUrl);
  };

  return (
    <button
      className={`${className} text-neutral-800 cursor-pointer`}
      onClick={handleBtnClick}
    >
      로그아웃
    </button>
  );
}
