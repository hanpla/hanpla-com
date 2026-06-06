"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { login, type ActionState } from "@/lib/actions/login";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import InputField from "@/components/ui/InputField";
import AuthLink from "@/components/auth/AuthLink";

const BUTTON_CLASS =
  "w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-50 font-medium hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-background dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-background transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const initialState: ActionState = {};
  const [state, formAction, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.success) {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [state.success, callbackUrl, router]);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <InputField
        id="user_id"
        name="user_id"
        label="아이디"
        type="text"
        placeholder="아이디 입력"
        disabled={isPending}
        defaultValue={state.fields?.user_id || ""}
      />

      <InputField
        id="password"
        name="password"
        label="비밀번호"
        type="password"
        placeholder="비밀번호 입력"
        disabled={isPending}
      />

      {/* Submit Button */}
      <div className="pt-2">
        <button type="submit" disabled={isPending} className={BUTTON_CLASS}>
          {isPending ? (
            <>
              로그인 중...
              <SpinnerIcon className="-mr-1 ml-2 h-4 w-4" />
            </>
          ) : (
            "로그인"
          )}
        </button>
      </div>

      {/* Error Message displayed below login button */}
      {state.errors?.global && (
        <div className="animate-in fade-in rounded-lg bg-red-50/50 border border-red-200 p-3 text-center text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      )}

      <AuthLink text="계정이 없으신가요?" linkText="회원가입" href="/signup" />
    </form>
  );
}
