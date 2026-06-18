import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  error?: string;
}

const Input = ({ error, className = "", ...props }: InputProps) => (
  <div className="flex w-full flex-col gap-1.5">
    <input
      className={`text-foreground w-full rounded-lg border bg-white px-3.5 py-2 text-sm placeholder-zinc-400 transition-all duration-200 focus:ring-2 focus:outline-hidden dark:bg-zinc-900/50 dark:placeholder-zinc-600 ${
        error
          ? "border-red-500 focus:border-red-500 focus:ring-red-500/10 dark:border-red-600 dark:focus:border-red-600"
          : "border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950/10 dark:border-zinc-800/80 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
      } ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-500 dark:text-red-400">{error}</span>}
  </div>
);
export default Input;
