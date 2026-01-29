import Link from "next/link";

// Components
import Search from "./Search";
import LoggedInLinks from "./LoggedInLinks";
import LoggedOutLinks from "./LoggedOutLinks";
import MobileMenu from "./MobileMenu";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
  isLogin: boolean;
  nickname: string;
}

export default function HeaderActions({ allBoards, isLogin, nickname }: Props) {
  return (
    <div className="flex items-center gap-2">
      {isLogin && (
        <Link href="/profile" className="text-xs text-neutral-800">
          @ {nickname}
        </Link>
      )}

      <Search allBoards={allBoards} />

      {isLogin ? <LoggedInLinks /> : <LoggedOutLinks />}

      <MobileMenu />
    </div>
  );
}
