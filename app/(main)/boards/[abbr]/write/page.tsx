import { notFound } from "next/navigation";

import { getBoardByAbbr } from "@/lib/queries/boards";
import PageTitle from "@/components/ui/page-title";
import PostWriteForm from "@/components/post/post-write-form";

interface WritePageProps {
  params: Promise<{
    abbr: string;
  }>;
}

const WritePage = async ({ params }: WritePageProps) => {
  const { abbr } = await params;

  // 게시판 정보 조회
  const board = await getBoardByAbbr(abbr);

  if (!board) {
    notFound();
  }

  return (
    <>
      <PageTitle title={board.name} href={`/boards/${board.abbr}`} />
      
      <div className="mt-6">
        <PostWriteForm boardAbbr={board.abbr} />
      </div>
    </>
  );
};

export default WritePage;
