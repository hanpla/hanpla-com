import Link from "next/link";

import { getSessionUser } from "@/lib/utils/auth";

const LINK_STYLE =
  "hover:text-foreground dark:hover:text-foreground text-foreground/80 text-sm font-medium transition-colors";

const PUBLIC_LINKS = [
  {
    href: "/login",
    label: "로그인",
  },
  {
    href: "/signup",
    label: "회원가입",
  },
];

const PulbicLinks = async () => {
  const user = await getSessionUser();
  if (user) {
    return null;
  }

  return (
    <>
      {PUBLIC_LINKS.map((link) => (
        <li key={link.href} className={LINK_STYLE}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </>
  );
};

export default PulbicLinks;
