"use client";

import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export default function AuthLink({ text, linkText, href }: AuthLinkProps) {
  return (
    <div className="pt-2 text-center">
      <p className="text-xs text-zinc-500 dark:text-zinc-500">
        {text}{" "}
        <Link
          href={href}
          className="font-medium text-zinc-900 transition-all hover:underline hover:underline-offset-4 dark:text-zinc-100"
        >
          {linkText}
        </Link>
      </p>
    </div>
  );
}
