// Components
import PageLayout from "../layout/PageLayout";
import Logo from "./Logo";
import HeaderActions from "./headerActions/HeaderActions";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  isLogin: boolean;
  nickname: string;
  allBoards: BoardType[];
}

export default function Header({ isLogin, nickname, allBoards }: Props) {
  return (
    <HeaderLayout>
      <PageLayout className="py-2 flex items-center justify-between">
        <Logo />
        <HeaderActions
          isLogin={isLogin}
          nickname={nickname}
          allBoards={allBoards}
        />
      </PageLayout>
    </HeaderLayout>
  );
}

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return <header className="border-b border-neutral-200">{children}</header>;
};
