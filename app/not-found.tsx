"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import HomeIcon from "@/components/icons/HomeIcon";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="text-foreground relative flex flex-1 flex-col items-center justify-center bg-radial from-zinc-100 to-zinc-50 p-6 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-zinc-300/25 blur-3xl dark:bg-zinc-800/10" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-zinc-400/15 blur-3xl dark:bg-zinc-700/5" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-6 z-10 w-full max-w-md space-y-8 rounded-2xl border border-zinc-200 bg-white/40 p-8 text-center shadow-2xl backdrop-blur-md duration-500 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="space-y-4">
          <h1 className="bg-linear-to-r from-zinc-900 to-zinc-500 bg-clip-text text-8xl font-black tracking-widest text-transparent dark:from-zinc-100 dark:to-zinc-500">
            404
          </h1>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="mx-auto max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
            요청하신 페이지가 삭제되었거나, 주소가 잘못 입력되었을 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleGoBack}
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
        </div>
      </div>
    </div>
  );
}
