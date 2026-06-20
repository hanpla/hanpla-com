import type { Board } from "@/lib/queries/board";

export interface GroupedBoards {
  groupedBoards: Record<string, Board[]>;
  categories: string[];
}

/**
 * 게시판 목록을 카테고리별로 그룹화하고 카테고리 이름을 정렬하여 반환합니다.
 */
export const groupBoardsByCategory = (boards: Board[]): GroupedBoards => {
  const grouped = Object.groupBy(boards, (board) => board.category || "기타");
  const groupedBoards = grouped as Record<string, Board[]>;
  const categories = Object.keys(groupedBoards).sort();

  return { groupedBoards, categories };
};

