"use client";

interface AuthTitleProps {
  title: string;
}

export default function AuthTitle({ title }: AuthTitleProps) {
  return (
    <div className="space-y-2 text-center">
      <h1 className="bg-linear-to-r from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-zinc-100 dark:to-zinc-400">
        {title}
      </h1>
    </div>
  );
}
