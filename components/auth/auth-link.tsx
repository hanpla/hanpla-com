"use client";

import Link from "next/link";

interface AuthLinkProps {
  text: string;
  linkText: string;
  href: string;
}

const AuthLink = ({ text, linkText, href }: AuthLinkProps) => (
  <div className="text-center">
    <p className="text-xs text-zinc-500 dark:text-zinc-500">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-zinc-900 hover:underline hover:underline-offset-4 dark:text-zinc-100"
      >
        {linkText}
      </Link>
    </p>
  </div>
);

export default AuthLink;
