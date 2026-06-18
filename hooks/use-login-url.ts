"use client";

import { usePathname } from "next/navigation";

export const useLoginUrl = () => {
  const pathname = usePathname();
  const showCallback = pathname && pathname !== "/login" && pathname !== "/signup";

  return showCallback ? `/login?callbackUrl=${encodeURIComponent(pathname)}` : "/login";
};
