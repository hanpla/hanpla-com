import { ComponentPropsWithoutRef, ReactNode } from "react";

import SpinnerIcon from "@/components/icons/spinner-icon";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "outline" | "text" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantStyles = {
  primary: "bg-zinc-950 text-zinc-50 active:scale-98 dark:bg-zinc-50 dark:text-zinc-950 ",
  secondary: "bg-zinc-100 text-zinc-900  active:scale-98 dark:bg-zinc-800 dark:text-zinc-100 ",
  outline:
    "border border-zinc-200 bg-transparent text-zinc-900  active:scale-98 dark:border-zinc-800 dark:text-zinc-100 ",
  danger:
    "bg-red-600 text-white active:scale-98 dark:bg-red-950/40 dark:text-red-400  dark:border dark:border-red-900/40",
  text: "bg-transparent text-zinc-600 dark:text-zinc-400 ",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-md gap-1",
  md: "px-4 py-2 text-sm rounded-lg gap-1.5",
  lg: "px-5 py-2.5 text-base rounded-xl gap-2",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  const isBtnDisabled = disabled || isLoading;

  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isBtnDisabled}
      {...props}
    >
      {isLoading ? <SpinnerIcon className="h-4 w-4" /> : leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button;
