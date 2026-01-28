// Components
import Logo from "./Logo";
import Container from "../layout/Container";
import HeaderActions from "./HeaderActions";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  allBoards: BoardType[];
  isLogin: boolean;
  nickname: string;
}

export default function Header({ allBoards, isLogin, nickname }: Props) {
  return (
    <header className="border-b border-neutral-200">
      <Container className="py-2 flex items-center justify-between">
        <Logo />

        <HeaderActions
          allBoards={allBoards}
          isLogin={isLogin}
          nickname={nickname}
        />
      </Container>
    </header>
  );
}
