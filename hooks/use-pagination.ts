import { useMemo } from "react";

interface UsePaginationOptions {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export const usePagination = ({
  currentPage,
  totalCount,
  pageSize,
  basePath,
  searchParams,
}: UsePaginationOptions) => {
  // 1. 전체 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pageSize) || 1;
  }, [totalCount, pageSize]);

  // 2. 화면에 보여줄 5개의 페이지 번호 배열 계산
  const pageNumbers = useMemo(() => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  // 3. 특정 페이지 번호에 대한 URL 경로 반환 함수
  const getPageLink = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, val]) => {
        if (val) {
          params.set(key, val);
        }
      });
    }
    params.set("page", String(pageNumber));
    return `${basePath}?${params.toString()}`;
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return {
    totalPages,
    pageNumbers,
    getPageLink,
    isFirstPage,
    isLastPage,
  };
};
