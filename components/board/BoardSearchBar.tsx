"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

interface BoardSearchBarProps {
  boardAbbr: string;
  initialSearchType: string;
  initialSearchKeyword: string;
  activeFilter: "all" | "popular";
}

export default function BoardSearchBar({
  boardAbbr,
  initialSearchType,
  initialSearchKeyword,
  activeFilter,
}: BoardSearchBarProps) {
  const router = useRouter();
  const [searchType, setSearchType] = useState(initialSearchType || "title");
  const [searchKeyword, setSearchKeyword] = useState(initialSearchKeyword || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (activeFilter === "popular") {
      params.set("filter", "popular");
    }

    if (searchKeyword.trim()) {
      params.set("searchType", searchType);
      params.set("searchKeyword", searchKeyword.trim());
    }

    // Reset page back to 1 on new search query
    params.set("page", "1");

    router.push(`/board/${boardAbbr}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-1.5 w-full sm:w-auto"
    >
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 transition-all cursor-pointer"
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
          className="w-full sm:w-48 px-3 py-2 pr-8 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:focus:ring-zinc-50 transition-all text-zinc-900 dark:text-zinc-100"
        />
      </div>

      <button
        type="submit"
        className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
      >
        <SearchIcon className="h-3.5 w-3.5" />
        검색
      </button>
    </form>
  );
}
