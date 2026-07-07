import Link from "next/link";
import PenIcon from "@/components/icons/pen-icon";

// 1. 글쓰기 버튼 컴포넌트
interface WriteButtonProps {
  boardAbbr: string;
}

export const WriteButton = ({ boardAbbr }: WriteButtonProps) => {
  return (
    <Link
      href={`/boards/${boardAbbr}/write`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-50 transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
      <PenIcon className="h-3.5 w-3.5" />
      글쓰기
    </Link>
  );
};

// 2. 필터 탭 컴포넌트 (검색 조건 보존 지원)
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
    const params = new URLSearchParams();
    
    // 검색어가 존재하는 경우 탭 이동 시에도 검색어를 보존합니다.
    if (searchType && searchKeyword) {
      params.set("searchType", searchType);
      params.set("searchKeyword", searchKeyword);
    }
    
    if (targetFilter === "popular") {
      params.set("filter", "popular");
    }

    const queryStr = params.toString();
    return `/boards/${boardAbbr}${queryStr ? `?${queryStr}` : ""}`;
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

// 3. 메인 BoardFilterBar 컴포넌트
interface BoardFilterBarProps {
  boardAbbr: string;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

export const BoardFilterBar = ({
  boardAbbr,
  activeFilter,
  searchType,
  searchKeyword,
}: BoardFilterBarProps) => {
  return (
    <div className="flex items-center justify-between py-2">
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
