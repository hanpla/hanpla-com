"use client";

import { useTheme } from "next-themes";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";
import { useMount } from "@/hooks/useMount";

export default function ThemeToggle() {
  const isMounted = useMount();
  
  const { theme, setTheme } = useTheme();

  if (!isMounted) {
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
      <SunIcon className="absolute h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

      {/* Moon Icon */}
      <MoonIcon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </button>
  );
}
