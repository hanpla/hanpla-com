"use client";

import { useTheme } from "next-themes";

import { useMount } from "@/hooks/use-mount";
import SunIcon from "@/components/icons/sun-icon";
import MoonIcon from "@/components/icons/moon-icon";

const ICON_MAP = {
  dark: SunIcon,
  light: MoonIcon,
};

const ThemeToggle = () => {
  const isMounted = useMount();

  const { setTheme, resolvedTheme } = useTheme();

  if (!isMounted) {
    return (
      <div className="h-10 w-10 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800" />
    );
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const Icon = ICON_MAP[resolvedTheme as keyof typeof ICON_MAP] || ICON_MAP.light;

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700"
      aria-label="Toggle Theme"
    >
      <span className="sr-only">Toggle theme</span>
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default ThemeToggle;
