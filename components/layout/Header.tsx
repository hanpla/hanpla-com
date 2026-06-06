"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNavTrigger from "./MobileNavTrigger";
import MobileNavDrawer from "./MobileNavDrawer";
import Logo from "./Logo";
import type { SessionUser } from "@/lib/utils/auth";

interface HeaderProps {
  user: SessionUser | null;
}

export default function Header({ user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const showCallback = pathname && pathname !== "/login" && pathname !== "/signup";
  const loginUrl = showCallback ? `/login?callbackUrl=${encodeURIComponent(pathname)}` : "/login";

  return (
    <>
      <header className="bg-background/80 sticky top-0 z-30 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
        <div className="wrapper flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo className="transition-opacity hover:opacity-80" />

          {/* Desktop Navigation */}
          <DesktopNav loginUrl={loginUrl} user={user} />

          {/* Mobile Navigation Trigger Button */}
          <MobileNavTrigger toggleMenu={toggleMenu} />
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop (rendered outside <header> to avoid backdrop-filter containing block bug) */}
      <MobileNavDrawer loginUrl={loginUrl} isOpen={isOpen} closeMenu={closeMenu} user={user} />
    </>
  );
}
