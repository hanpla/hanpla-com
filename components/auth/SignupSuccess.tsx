"use client";

import SpinnerIcon from "@/components/icons/SpinnerIcon";

interface SignupSuccessProps {
  countdown: number;
  isNavigating: boolean;
  onNavigate: () => void;
}

const BUTTON_CLASS =
  "w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-50 font-medium hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-background dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-background transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

export default function SignupSuccess({ countdown, isNavigating, onNavigate }: SignupSuccessProps) {
  return (
    <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6 transition-colors duration-300">
      <div className="animate-in fade-in w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 text-center shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          {isNavigating ? (
            <SpinnerIcon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
          ) : (
            <svg
              className="h-6 w-6 text-zinc-900 dark:text-zinc-100"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">회원가입 완료!</h2>
          <div className="flex flex-col items-center justify-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <span>성공적으로 계정이 등록되었습니다.</span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
              <SpinnerIcon className="h-3.5 w-3.5" />
              <span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {countdown}초
                </span>{" "}
                후 로그인 페이지로 이동합니다.
              </span>
            </div>
          </div>
        </div>
        <button onClick={onNavigate} disabled={isNavigating} className={BUTTON_CLASS}>
          {isNavigating ? (
            <>
              <SpinnerIcon className="mr-2 h-4 w-4" />
              이동 중...
            </>
          ) : (
            "로그인 화면으로 이동"
          )}
        </button>
      </div>
    </div>
  );
}
