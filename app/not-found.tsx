"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import ErrorStatusView from "@/components/ui/ErrorStatusView";

// Standalone NotFound badge sub-component
const NotFoundBadge = () => {
  return (
    <h1 className="bg-linear-to-r from-zinc-900 to-zinc-500 bg-clip-text text-8xl font-black tracking-widest text-transparent dark:from-zinc-100 dark:to-zinc-500">
      404
    </h1>
  );
};

// Standalone NotFound actions sub-component
const NotFoundActions = ({ onGoBack }: { onGoBack: () => void }) => {
  return (
    <>
      <button
        onClick={onGoBack}
        className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium shadow-sm transition-all hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
      >
        <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        이전 화면으로
      </button>
      <Link
        href="/"
        className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-50 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <HomeIcon className="h-4 w-4" />
        메인 화면으로
      </Link>
    </>
  );
};

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ErrorStatusView
      title="페이지를 찾을 수 없습니다"
      description="요청하신 페이지가 삭제되었거나, 주소가 잘못 입력되었을 수 있습니다."
      badge={<NotFoundBadge />}
      actions={<NotFoundActions onGoBack={handleGoBack} />}
      ambientTopColor="bg-zinc-300/25 dark:bg-zinc-800/10"
      ambientBottomColor="bg-zinc-400/15 dark:bg-zinc-700/5"
    />
  );
}
