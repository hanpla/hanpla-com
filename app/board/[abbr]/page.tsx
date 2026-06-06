import { getBoardByAbbr } from "@/lib/queries/board";
import { getPostsByBoardAbbr } from "@/lib/queries/posts";
import BoardDetailView from "@/components/board/BoardDetailView";

interface BoardPageProps {
  params: Promise<{
    abbr: string;
  }>;
}

export async function generateMetadata({ params }: BoardPageProps) {
  const { abbr } = await params;
  const board = await getBoardByAbbr(abbr);
  const boardName = board ? board.name : abbr.toUpperCase();

  return {
    title: `${boardName} 게시판 - hanpla-com`,
    description: `${boardName} 주제에 대해 이야기하고 다양한 게시글을 확인해 보세요.`,
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { abbr } = await params;

  // Fetch board info and posts from Supabase in parallel
  const [board, posts] = await Promise.all([getBoardByAbbr(abbr), getPostsByBoardAbbr(abbr)]);

  // If not found in database, provide a placeholder fallback so UI testing works for any path
  const finalBoard = board || {
    abbr,
    name: abbr.toUpperCase(),
    category: "임시",
    created_at: new Date().toISOString(),
  };

  console.log(posts);

  return <BoardDetailView board={finalBoard} posts={posts} />;
}
