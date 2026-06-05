"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    let isMounted = true;
    const mount = () => {
      if (isMounted) {
        setMounted(true);
      }
    };
    const handle = requestAnimationFrame(mount);
    return () => {
      isMounted = false;
      cancelAnimationFrame(handle);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="dark:bg-zinc-850 h-10 w-10 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800" />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 shadow-sm transition-all duration-200 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
      aria-label="Toggle Theme"
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sun Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m0 13.5V21M9.75 12l-.75-.75M14.25 12l.75-.75M5.636 5.636l1.273 1.273M16.364 16.364l1.273 1.273M3 12h2.25M18.75 12H21M5.636 18.364l1.273-1.273M16.364 7.636l1.273-1.273M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
        />
      </svg>

      {/* Moon Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  );
}
