"use client";

import { ComponentPropsWithoutRef } from "react";
import Input from "./Input";

interface InputFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  error?: string;
}

export default function InputField({ label, id, error, ...props }: InputFieldProps) {
  const LABEL_CLASS =
    "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 transition-colors";

  return (
    <div>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </label>
      <Input id={id} hasError={!!error} {...props} />
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
