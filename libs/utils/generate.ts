// Types
import { AbbrSearchParams } from "../types/board";

export function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage - 2;
  let end = currentPage + 2;

  if (start < 1) {
    start = 1;
    end = 5;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - 4;
  }

  return Array.from({ length: 5 }, (_, i) => start + i);
}

export function generateAbbrQS(search: AbbrSearchParams) {
  const query = new URLSearchParams();

  Object.entries(search).forEach(([key, value]) => {
    if (value) query.set(key, String(value));
  });

  if (search.page <= 1) query.delete("page");
  if (search.likeCount <= 0) query.delete("likeCount");

  return query.toString();
}
