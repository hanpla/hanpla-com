// Components
import Link from "next/link";
import PageLayout from "../layout/PageLayout";
import { Label, Layout } from "../RecentBoard/RecentBoard";

// Types
import { BoardType } from "@/libs/types/board";

interface Props {
  popularBoards: BoardType[];
}

export default function PopularBoards({ popularBoards }: Props) {
  return (
    <PageLayout className="my-4">
      <Layout className="md:hidden">
        <Label>인기 게시판</Label>
        <Cards popularBoards={popularBoards} />
      </Layout>
    </PageLayout>
  );
}

const Cards = ({ popularBoards }: Props) => {
  return (
    <>
      {popularBoards.map((board) => (
        <Card key={board.abbr} board={board} />
      ))}
    </>
  );
};

const Card = ({ board }: { board: BoardType }) => {
  return (
    <div className="flex items-center text-xs text-neutral-500 bg-neutral-100 hover:text-neutral-800 px-2.5 py-1 rounded-full hover:bg-neutral-200 transition-all active:scale-95">
      <CardLink board={board} />
    </div>
  );
};

const CardLink = ({ board }: { board: BoardType }) => {
  return (
    <Link href={`/board/${board.abbr}`} className="p-0.5 hover:font-medium">
      {board.name}
    </Link>
  );
};
