import Link from "next/link";

export default function LoggedInLinks() {
  return (
    <>
      <Link href="/board" className="hidden md:block text-sm text-neutral-800">
        전체 게시판
      </Link>
      <button className="hidden md:block text-sm text-neutral-800 cursor-pointer">
        로그아웃
      </button>
    </>
  );
}
