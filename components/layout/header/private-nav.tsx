import Link from "next/link";

import type { SessionUser } from "@/types/auth";
import LogoutButton from "./logout-button";

interface PrivateNavProps {
  user: SessionUser;
}

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const PrivateNav = ({ user }: PrivateNavProps) => {
  return (
    <>
      <Link href="/profile" className={LINK_STYLE}>
        @{user.nickname}
      </Link>
      <LogoutButton />
    </>
  );
};

export default PrivateNav;
