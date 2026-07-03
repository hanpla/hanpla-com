import Link from "next/link";

import type { SessionUser } from "@/types/auth";
import PulbicNav from "./public-nav";
import PrivateNav from "./private-nav";

interface NavProps {
  user: SessionUser | null;
}

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const Nav = ({ user }: NavProps) => {
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-6">
        <Link href="/boards" className={LINK_STYLE}>
          전체 게시판
        </Link>
        {user ? <PrivateNav user={user} /> : <PulbicNav />}
      </ul>
    </nav>
  );
};

export default Nav;
