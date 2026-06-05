"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Header() {
  const pathname = usePathname();

  const showCallback = pathname && pathname !== "/login" && pathname !== "/signup";
  const loginUrl = showCallback ? `/login?callbackUrl=${encodeURIComponent(pathname)}` : "/login";

  return (
    <header className="bg-background/80 sticky top-0 z-50 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-foreground text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          Hanpla
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav loginUrl={loginUrl} />

        {/* Mobile Navigation */}
        <MobileNav loginUrl={loginUrl} />
      </div>
    </header>
  );
}
