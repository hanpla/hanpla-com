"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MenuIcon from "@/components/icons/MenuIcon";
import CloseIcon from "@/components/icons/CloseIcon";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-background/80 sticky top-0 z-50 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="text-foreground text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            Hanpla
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/board"
              className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
            >
              전체 게시판
            </Link>
            <Link
              href="/login"
              className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="hover:text-foreground dark:hover:text-foreground text-sm font-medium text-zinc-600 transition-colors dark:text-zinc-400"
            >
              회원가입
            </Link>
            <div className="flex h-5 items-center border-l border-zinc-200 pl-4 dark:border-zinc-800">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Nav Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="hover:text-foreground dark:hover:text-foreground cursor-pointer rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`bg-background fixed top-0 right-0 z-70 flex h-full w-72 transform flex-col border-l border-zinc-200 shadow-2xl transition-transform duration-300 ease-in-out md:hidden dark:border-zinc-800/85 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800/80">
          <Link
            href="/"
            className="text-foreground text-xl font-bold tracking-tight"
            onClick={closeMenu}
          >
            Hanpla
          </Link>
          <button
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground cursor-pointer rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900/60"
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-1 flex-col gap-5 px-6 py-8">
          <Link
            href="/board"
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            전체 게시판
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="hover:text-foreground dark:hover:text-foreground py-2 text-base font-medium text-zinc-600 transition-colors dark:text-zinc-400"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </>
  );
}
