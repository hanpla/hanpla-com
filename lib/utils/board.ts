import type { Board } from "@/lib/supabase/queries/board";

export interface GroupedBoards {
  groupedBoards: Record<string, Board[]>;
  categories: string[];
}

/**
 * 게시판 목록을 카테고리별로 그룹화하고 카테고리 이름을 정렬하여 반환합니다.
 */
export const groupBoardsByCategory = (boards: Board[]): GroupedBoards => {
  const groupedBoards = boards.reduce<Record<string, Board[]>>((acc, board) => {
    const category = board.category || "기타";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(board);
    return acc;
  }, {});

  const categories = Object.keys(groupedBoards).sort();

  return { groupedBoards, categories };
};
