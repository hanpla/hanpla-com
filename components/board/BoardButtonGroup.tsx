import Link from "next/link";
import PenIcon from "@/components/icons/PenIcon";

interface BoardButtonGroupProps {
  boardAbbr: string;
  activeFilter: "all" | "popular";
  searchType?: string;
  searchKeyword?: string;
}

export default function BoardButtonGroup({
  boardAbbr,
  activeFilter,
  searchType,
  searchKeyword,
}: BoardButtonGroupProps) {
  const activeClass =
    "px-4 py-2 text-sm font-semibold rounded-lg bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors cursor-pointer";
  const inactiveClass =
    "px-4 py-2 text-sm font-medium rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer";

  const getFilterLink = (filterVal: "all" | "popular") => {
    const params = new URLSearchParams();
    if (filterVal === "popular") {
      params.set("filter", "popular");
    }
    if (searchType && searchKeyword) {
      params.set("searchType", searchType);
      params.set("searchKeyword", searchKeyword);
    }
    const queryStr = params.toString();
    return `/board/${boardAbbr}${queryStr ? `?${queryStr}` : ""}`;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {/* 전체글 버튼 */}
        <Link
          href={getFilterLink("all")}
          className={activeFilter === "all" ? activeClass : inactiveClass}
        >
          전체글
        </Link>

        {/* 인기글 버튼 */}
        <Link
          href={getFilterLink("popular")}
          className={activeFilter === "popular" ? activeClass : inactiveClass}
        >
          인기글
        </Link>
      </div>

      {/* 글쓰기 버튼 (추후 연동 대비) */}
      <button className="bg-background text-foreground flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
        <PenIcon className="h-4 w-4" />
        글쓰기
      </button>
    </div>
  );
}
