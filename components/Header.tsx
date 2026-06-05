"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MenuIcon from "./icons/MenuIcon";
import CloseIcon from "./icons/CloseIcon";

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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            Hanpla
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/board"
              className="text-sm font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground transition-colors"
            >
              전체 게시판
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium px-3.5 py-2 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-sm"
            >
              회원가입
            </Link>
            <div className="border-l border-zinc-200 dark:border-zinc-800 pl-4 h-5 flex items-center">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Nav Button */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-zinc-600 hover:text-foreground hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-foreground dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-background border-l border-zinc-200 dark:border-zinc-800/85 z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 px-6 border-b border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground"
            onClick={closeMenu}
          >
            Hanpla
          </Link>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg text-zinc-600 hover:text-foreground hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-foreground dark:hover:bg-zinc-900/60 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-6 py-8 flex flex-col gap-5">
          <Link
            href="/board"
            onClick={closeMenu}
            className="text-base font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground transition-colors py-2"
          >
            전체 게시판
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className="text-base font-medium text-zinc-600 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground transition-colors py-2"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            onClick={closeMenu}
            className="text-base font-medium text-center text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors py-3 px-4 rounded-xl font-semibold mt-4 shadow-sm"
          >
            회원가입
          </Link>
        </nav>
      </div>
    </>
  );
}
