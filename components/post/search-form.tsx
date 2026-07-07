"use client";

import { SubmitEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

interface SearchFormProps {
  baseUrl: string;
  defaultType?: string;
  defaultKeyword?: string;
}

type SearchType = "title_content" | "title" | "content" | "author";

export const SearchForm = ({ baseUrl, defaultType, defaultKeyword }: SearchFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchType, setSearchType] = useState<SearchType>(
    (defaultType as SearchType) || "title_content"
  );
  const [keyword, setKeyword] = useState(defaultKeyword || "");

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // 검색 시 페이지 번호는 항상 1페이지로 초기화

    if (keyword.trim()) {
      params.set("searchType", searchType);
      params.set("searchKeyword", keyword.trim());
    } else {
      params.delete("searchType");
      params.delete("searchKeyword");
    }

    router.push(`${baseUrl}?${params.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-center gap-2 pt-2 text-sm">
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value as SearchType)}
        className="cursor-pointer rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
      >
        <option value="title_content">제목 + 내용</option>
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="author">닉네임</option>
      </select>
      <div className="w-56">
        <Input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력해 주세요"
          className="py-1.5! text-xs!"
        />
      </div>
      <Button type="submit" variant="primary" size="sm">
        검색
      </Button>
    </form>
  );
};

export default SearchForm;
