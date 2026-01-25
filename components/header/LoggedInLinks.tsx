import Link from "next/link";

interface Props {
  nickname: string;
}

export default function LoggedInLinks({ nickname }: Props) {
  return (
    <>
      <Link href="/profile" className="text-xs text-neutral-800">
        @ {nickname}
      </Link>
      <Link href="/board" className="text-sm text-neutral-800">
        전체 게시판
      </Link>
      <button className="hidden md:block text-sm text-neutral-800 cursor-pointer">
        로그아웃
      </button>
    </>
  );
}
