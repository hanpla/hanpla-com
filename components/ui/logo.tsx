import Link from "next/link";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
  <Link href="/" className={`text-foreground text-xl font-bold tracking-tight ${className}`}>
    Hanpla
  </Link>
);
export default Logo;
