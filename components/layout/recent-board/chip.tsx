import { ReactNode } from "react";
import Link from "next/link";

interface ChipProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "link";
  href?: string;
  onClick?: () => void;
  title?: string;
}

const Chip = ({ children, as = "link", href = "", onClick, title, className }: ChipProps) => {
  const baseClassName = `shrink-0 whitespace-nowrap rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800 ${className}`;

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={baseClassName}
        title={title}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={baseClassName}
      title={title}
    >
      {children}
    </Link>
  );
};

export default Chip;
