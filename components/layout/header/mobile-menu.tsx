"use client";

import { useState } from "react";

import type { SessionUser } from "@/types/auth";
import MenuIcon from "@/components/icons/menu-icon";
import MobileMenuDrawer from "./mobile-menu-drawer";

interface MobileMenuProps {
  user: SessionUser | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="block md:hidden">
      {/* Hamburger Toggle Button */}
      <button
        onClick={openMenu}
        className="flex h-10 w-10 cursor-pointer items-center justify-center text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        aria-label="Open menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {/* Portal Drawer Menu */}
      <MobileMenuDrawer isOpen={isOpen} closeMenu={closeMenu} user={user} />
    </div>
  );
};

export default MobileMenu;
