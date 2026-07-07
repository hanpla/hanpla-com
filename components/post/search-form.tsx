"use client";

interface SearchFormProps {
  baseUrl: string;
  defaultType?: string;
  defaultKeyword?: string;
}

export const SearchForm = ({ baseUrl, defaultType, defaultKeyword }: SearchFormProps) => {
  return (
    <div className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-400 dark:border-zinc-800 dark:bg-zinc-950/20">
      [검색 폼 플레이스홀더 (BaseURL: {baseUrl}, Type: {defaultType || "없음"}, Keyword: {defaultKeyword || "없음"})]
    </div>
  );
};
