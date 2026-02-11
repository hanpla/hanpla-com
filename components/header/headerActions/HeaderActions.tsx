import Link from "next/link";

// Components
import NavLinks from "./NavLinks";
import Search from "../search/Search";
import MobileMenu from "../MobileMenu/MobileMenu";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  isLogin: boolean;
  nickname: string;
  allBoards: BoardType[];
}

export default function HeaderActions({ isLogin, nickname, allBoards }: Props) {
  return (
    <Container>
      {isLogin && <Nickname nickname={nickname} />}
      <Search allBoards={allBoards} />
      <NavLinks isLogin={isLogin} />
      <MobileMenu isLogin={isLogin} />
    </Container>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const Nickname = ({ nickname }: { nickname: string }) => {
  return (
    <Link href={"/profile"} className="text-xs text-neutral-800">
      @ {nickname}
    </Link>
  );
};
