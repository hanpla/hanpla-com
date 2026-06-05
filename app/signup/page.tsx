"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SignupForm from "./SignupForm";

const BUTTON_CLASS =
  "w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-50 font-medium hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-background dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-background transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export default function SignupPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  useEffect(() => {
    if (!isSuccess) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuccess, router]);

  if (isSuccess) {
    return (
      <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6 transition-colors duration-300">
        <div className="animate-in fade-in w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 text-center shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
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
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">회원가입 완료!</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              성공적으로 계정이 등록되었습니다.
              <br />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {countdown}초
              </span>{" "}
              후 로그인 페이지로 이동합니다.
            </p>
          </div>
          <button onClick={() => router.push("/login")} className={BUTTON_CLASS}>
            로그인 화면으로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6 transition-colors duration-300">
      <div className="animate-in fade-in w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="space-y-2 text-center">
          <h1 className="bg-linear-to-r from-zinc-900 to-zinc-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-zinc-100 dark:to-zinc-400">
            회원가입
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            새로운 계정을 생성하여 Hanpla 서비스를 시작해 보세요.
          </p>
        </div>

        <SignupForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
