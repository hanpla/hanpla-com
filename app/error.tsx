"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AlertTriangleIcon from "@/components/icons/AlertTriangleIcon";
import HomeIcon from "@/components/icons/HomeIcon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Runtime error caught at root:", error);
  }, [error]);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="text-foreground relative flex flex-1 flex-col items-center justify-center bg-radial from-zinc-100 to-zinc-50 p-6 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-950">
      {/* Background ambient light effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-red-500/10 blur-3xl dark:bg-red-900/5" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-zinc-400/15 blur-3xl dark:bg-zinc-700/5" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-6 z-10 w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white/40 p-8 text-center shadow-2xl backdrop-blur-md duration-500 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-red-100/80 text-red-600 dark:bg-red-950/35 dark:text-red-400">
            {/* Pulsing ring */}
            <div className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />
            <AlertTriangleIcon className="relative h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">문제가 발생했습니다</h1>
            <p className="mx-auto max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
              요청을 처리하는 도중 서버 오류 또는 예기치 못한 문제가 발생했습니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleReset}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-50 shadow-md transition-all hover:scale-[1.02] hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            다시 시도하기
          </button>
          <Link
            href="/"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium shadow-sm transition-all hover:scale-[1.02] hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
          >
            <HomeIcon className="h-4 w-4" />
            메인 화면으로
          </Link>
        </div>

        {/* Technical details accordion */}
        <div className="pt-2 text-left">
          <button
            onClick={handleToggleDetails}
            className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-zinc-500 select-none hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            {showDetails ? "상세 정보 숨기기" : "기술적인 상세 정보 보기"}
          </button>

          {showDetails && (
            <div className="animate-in fade-in slide-in-from-top-2 mt-3 max-h-40 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
              <p className="mb-1 font-semibold text-zinc-800 dark:text-zinc-200">Error Message:</p>
              <p className="break-all whitespace-pre-wrap">{error.message || "알 수 없는 에러"}</p>
              {error.digest && (
                <p className="mt-2">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">Digest:</span>{" "}
                  {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
