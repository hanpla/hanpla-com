"use client";

import { useState } from "react";

import Nav from "./nav";
import MobileMenuDrawer from "./mobile-menu-drawer";

const NavClient = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Nav toggleMenu={toggleMenu} />
      <MobileMenuDrawer isOpen={isOpen} closeMenu={closeMenu} />
    </>
  );
};

export default NavClient;
