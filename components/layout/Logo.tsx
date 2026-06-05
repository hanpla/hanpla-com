import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`text-foreground text-xl font-bold tracking-tight ${className}`}
    >
      Hanpla
    </Link>
  );
}
