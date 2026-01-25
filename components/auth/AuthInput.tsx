interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({ label, id, ...props }: AuthInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-neutral-700 ml-1"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl outline-none focus:border-neutral-400 focus:ring-4 focus:ring-neutral-100 transition-all placeholder:text-neutral-400"
      />
    </div>
  );
}
