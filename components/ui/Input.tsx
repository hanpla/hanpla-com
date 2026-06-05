"use client";

import { ComponentPropsWithoutRef } from "react";

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  hasError?: boolean;
}

export default function Input({ hasError, className = "", ...props }: InputProps) {
  const INPUT_BASE_CLASS =
    "w-full px-3.5 py-2 text-sm rounded-lg bg-transparent border shadow-sm outline-none transition-all duration-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  const INPUT_NORMAL_CLASS =
    "border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/20 dark:border-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/20 text-zinc-900 dark:text-zinc-100";
  const INPUT_ERROR_CLASS =
    "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500/20 text-red-900 dark:text-red-100";

  return (
    <input
      className={`${INPUT_BASE_CLASS} ${
        hasError ? INPUT_ERROR_CLASS : INPUT_NORMAL_CLASS
      } ${className}`}
      {...props}
    />
  );
}
