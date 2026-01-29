import Link from "next/link";

// Components
import LogoutBtn from "../common/LogoutBtn";

export default function LoggedInLinks() {
  return (
    <>
      <Link href="/board" className="hidden md:block text-sm text-neutral-800">
        전체 게시판
      </Link>
      <LogoutBtn className="hidden md:block text-sm" />
    </>
  );
}
