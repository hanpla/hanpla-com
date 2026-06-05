"use client";

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import AuthTitle from "@/components/auth/AuthTitle";

export default function LoginPage() {
  return (
    <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6 transition-colors duration-300">
      <div className="animate-in fade-in w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
        <AuthTitle title="로그인" />

        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
              <span className="text-sm text-zinc-500">로그인 양식 로딩 중...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
