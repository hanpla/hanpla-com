import { ComponentPropsWithoutRef } from "react";

import Input from "./input";

interface InputFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  label: string;
}

const InputField = ({ label, id, ...props }: InputFieldProps) => (
  <div className="flex w-full flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
      {label}
    </label>
    <Input id={id} {...props} />
  </div>
);
export default InputField;
