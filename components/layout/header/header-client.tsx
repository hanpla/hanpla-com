"use client";

import { useState } from "react";

import Logo from "@/components/ui/logo";
import Nav from "./nav";
import MobileMenuDrawer from "./mobile-menu-drawer";
import type { SessionUser } from "@/lib/utils/auth";

interface HeaderClientProps {
  user: SessionUser | null;
}

const HeaderClient = ({ user }: HeaderClientProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-background/80 sticky top-0 z-30 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
        <div className="wrapper flex items-center justify-between py-4">
          <Logo />
          <Nav user={user} toggleMenu={toggleMenu} />
        </div>
      </header>
      <MobileMenuDrawer user={user} isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
};

export default HeaderClient;
