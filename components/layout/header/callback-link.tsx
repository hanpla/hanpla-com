"use client";

import { ReactNode } from "react";
import Link from "next/link";

import { useLoginCallback } from "@/hooks/use-login-callback";

interface CallbackLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const CallbackLink = ({ href, children, className }: CallbackLinkProps) => {
  const loginUrl = useLoginCallback();
  const finalHref = href === "/login" ? loginUrl : href;

  return (
    <Link href={finalHref} className={className}>
      {children}
    </Link>
  );
};

export default CallbackLink;
