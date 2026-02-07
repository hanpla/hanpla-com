"use client";

import { useSearchParams } from "next/navigation";
import { Search as SearchIcon, ChevronDown } from "lucide-react";

interface Props {
  abbr: string;
}

export default function Search({ abbr }: Props) {
  const searchParams = useSearchParams();
  const currentLikeCount = searchParams.get("likeCount");

  const currentSearchType = searchParams.get("searchType") || "title";
  const currentPostSearch = searchParams.get("postSearch") || "";

  return (
    <Layout>
      <FormLayout abbr={abbr}>
        <Select defaultValue={currentSearchType} />
        <Input defaultValue={currentPostSearch} />
        <HiddenInput currentLikeCount={currentLikeCount} />
        <Button />
      </FormLayout>
    </Layout>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-lg mx-auto mt-6">{children}</div>;
};

const FormLayout = ({
  children,
  abbr,
}: {
  children: React.ReactNode;
  abbr: string;
}) => {
  return (
    <form action={`/board/${abbr}`} className="flex items-center gap-2">
      {children}
    </form>
  );
};

const Select = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <div className="relative">
      <select
        name="searchType"
        defaultValue={defaultValue}
        className="appearance-none pl-4 pr-10 py-2.5 bg-neutral-100 border-none rounded-2xl text-sm font-medium text-neutral-700 outline-none transition-all cursor-pointer"
      >
        <option value="title">제목</option>
        <option value="nickname">글쓴이</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
        <ChevronDown size={16} />
      </div>
    </div>
  );
};

const Input = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <div className="relative flex-1 group">
      <label htmlFor="postSearch" className="sr-only">
        게시글 검색
      </label>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        name="postSearch"
        id="postSearch"
        defaultValue={defaultValue}
        placeholder="검색어를 입력하세요"
        className="w-full pl-11 pr-4 py-2.5 bg-neutral-100 border-none rounded-2xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:ring-1 focus:ring-neutral-200 focus:outline-none"
      />
    </div>
  );
};

const HiddenInput = ({
  currentLikeCount,
}: {
  currentLikeCount?: string | null;
}) => {
  if (!currentLikeCount) return null;

  return <input type="hidden" name="likeCount" value={currentLikeCount} />;
};

const Button = () => {
  return (
    <button
      type="submit"
      className="px-5 py-2.5 bg-neutral-800 text-white text-sm font-semibold rounded-2xl hover:bg-neutral-700 transition-colors"
    >
      검색
    </button>
  );
};
