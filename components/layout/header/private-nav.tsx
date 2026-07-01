import Link from "next/link";

import { getSessionUser } from "@/lib/utils/auth";
import LogoutButton from "./logout-button";

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const PrivateNav = async () => {
  const user = await getSessionUser();
  if (!user) {
    return null;
  }

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
