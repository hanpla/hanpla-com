import Link from "next/link";
import PenIcon from "@/components/icons/pen-icon";

// 1. 글쓰기 버튼 컴포넌트 (독립 추출)
interface WriteButtonProps {
  boardAbbr: string;
}

export const WriteButton = ({ boardAbbr }: WriteButtonProps) => {
  return (
    <Link
      href={`/board/${boardAbbr}/write`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-50 transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <PenIcon className="h-3.5 w-3.5" />
      글쓰기
    </Link>
  );
};

// 2. 필터 탭 컴포넌트 (독립 추출 및 마크업 루프화)
interface FilterTabsProps {
  boardAbbr: string;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

const TAB_ITEMS = [
  { id: "all", label: "전체글" },
  { id: "popular", label: "인기글" },
] as const;

export const FilterTabs = ({
  boardAbbr,
  activeFilter,
  searchType,
  searchKeyword,
}: FilterTabsProps) => {
  const getFilterLink = (targetFilter: "all" | "popular") => {
    if (targetFilter === "all") {
      return `/board/${boardAbbr}`;
    }

    const params = new URLSearchParams();
    if (searchType) params.set("searchType", searchType);
    if (searchKeyword) params.set("searchKeyword", searchKeyword);
    params.set("filter", "popular");

    const queryStr = params.toString();
    return `/board/${boardAbbr}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="inline-flex rounded-lg bg-zinc-100 p-0.5 dark:bg-zinc-800/80">
      {TAB_ITEMS.map((item) => {
        const isActive = activeFilter === item.id;
        return (
          <Link
            key={item.id}
            href={getFilterLink(item.id)}
            className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-all ${
              isActive
                ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

// 3. 메인 BoardFilterBar 컴포넌트 (합성 및 Props 단순화)
interface BoardFilterBarProps {
  boardAbbr: string;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

const BoardFilterBar = ({
  boardAbbr,
  activeFilter,
  searchType,
  searchKeyword,
}: BoardFilterBarProps) => {
  // 'best' 게시판(전체 인기글)인 경우 렌더링하지 않습니다.
  if (boardAbbr === "best") {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800/60">
      <FilterTabs
        boardAbbr={boardAbbr}
        activeFilter={activeFilter}
        searchType={searchType}
        searchKeyword={searchKeyword}
      />
      <WriteButton boardAbbr={boardAbbr} />
    </div>
  );
};

export default BoardFilterBar;
