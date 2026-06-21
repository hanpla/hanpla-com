"use client";

import { SubmitEvent, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import SearchIcon from "@/components/icons/search-icon";

interface BoardSearchBarInnerProps {
  initialSearchType: string;
  initialSearchKeyword: string;
  boardAbbr?: string;
  activeFilter: string;
  basePath?: string;
}

// 1. 작은 로컬 헬퍼 서브컴포넌트를 파일 상단에 정의
const BoardSearchBarInner = ({
  initialSearchType,
  initialSearchKeyword,
  boardAbbr,
  activeFilter,
  basePath,
}: BoardSearchBarInnerProps) => {
  const router = useRouter();
  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword);

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    if (activeFilter === "popular") {
      urlParams.set("filter", "popular");
    }

    if (searchKeyword.trim()) {
      urlParams.set("searchType", searchType);
      urlParams.set("searchKeyword", searchKeyword.trim());
    }

    // 새로운 검색 수행 시 1페이지로 복귀
    urlParams.set("page", "1");

    const base = basePath || `/board/${boardAbbr || ""}`;
    router.push(`${base}?${urlParams.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center gap-1.5 sm:w-auto">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="cursor-pointer rounded-lg border border-zinc-200 bg-zinc-50/50 px-2.5 py-2 text-xs font-semibold text-zinc-700 transition-all focus:ring-2 focus:ring-zinc-950 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-300 dark:focus:ring-zinc-50"
      >
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="author">글쓴이</option>
      </select>

      <div className="relative flex-1 sm:flex-initial">
        <input
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="검색어 입력..."
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 py-2 pr-8 text-xs text-zinc-900 transition-all focus:ring-2 focus:ring-zinc-950 focus:outline-none sm:w-48 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-100 dark:focus:ring-zinc-50"
        />
      </div>

      <button
        type="submit"
        className="flex shrink-0 cursor-pointer items-center gap-1 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <SearchIcon className="h-3.5 w-3.5" />
        검색
      </button>
    </form>
  );
};

interface BoardSearchBarProps {
  basePath?: string;
}

// 2. 메인 컴포넌트는 파일 최하단에 배치
const BoardSearchBar = ({ basePath }: BoardSearchBarProps) => {
  const searchParams = useSearchParams();
  const params = useParams<{ abbr?: string }>();
  const boardAbbr = params?.abbr;

  const initialSearchType = searchParams.get("searchType") || "title";
  const initialSearchKeyword = searchParams.get("searchKeyword") || "";
  const activeFilter = searchParams.get("filter") || "all";

  // URL 검색 파라미터가 변경될 때마다 key가 달라져 컴포넌트 상태가 자동으로 리셋됩니다.
  const uniqueKey = `${initialSearchType}-${initialSearchKeyword}-${boardAbbr}`;

  return (
    <BoardSearchBarInner
      key={uniqueKey}
      initialSearchType={initialSearchType}
      initialSearchKeyword={initialSearchKeyword}
      boardAbbr={boardAbbr}
      activeFilter={activeFilter}
      basePath={basePath}
    />
  );
};

export default BoardSearchBar;
