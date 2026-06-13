import { ReactNode } from "react";

interface ProfileCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ProfileCard({ title, description, children }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white/40 p-6 shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/30">
      <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{title}</h2>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
      {children}
    </div>
  );
}
