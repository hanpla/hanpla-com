import Link from "next/link";

import { getSessionUser } from "@/lib/utils/auth";
import CallbackLink from "./callback-link";

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const PulbicLinks = async () => {
  const user = await getSessionUser();
  if (user) {
    return null;
  }

  return (
    <>
      <li className={LINK_STYLE}>
        <CallbackLink href="/login">로그인</CallbackLink>
      </li>
      <li className={LINK_STYLE}>
        <Link href="/signup">회원가입</Link>
      </li>
    </>
  );
};

export default PulbicLinks;
