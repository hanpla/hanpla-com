"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { signup, type ActionState } from "@/app/actions/signup";
import SpinnerIcon from "@/components/icons/SpinnerIcon";

const LABEL_CLASS =
  "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 transition-colors";
const INPUT_BASE_CLASS =
  "w-full px-3.5 py-2 text-sm rounded-lg bg-transparent border shadow-sm outline-none transition-all duration-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
const INPUT_NORMAL_CLASS =
  "border-zinc-200 focus:border-zinc-900 focus:ring-zinc-950/20 dark:border-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/20 text-zinc-900 dark:text-zinc-100";
const INPUT_ERROR_CLASS =
  "border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500/20 text-red-900 dark:text-red-100";
const BUTTON_CLASS =
  "w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-50 font-medium hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-background dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-background transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

interface SignupFormProps {
  onSuccess: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const initialState: ActionState = {};
  const [state, formAction, isPending] = useActionState(signup, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      {state.errors?.global && (
        <div className="bg-red-55/10 rounded-lg border border-red-200 p-3.5 text-xs font-medium text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      )}

      {/* Nickname Field */}
      <div>
        <label htmlFor="nickname" className={LABEL_CLASS}>
          닉네임
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          placeholder="2~8자의 닉네임"
          disabled={isPending}
          defaultValue={state.fields?.nickname || ""}
          className={`${INPUT_BASE_CLASS} ${
            state.errors?.nickname ? INPUT_ERROR_CLASS : INPUT_NORMAL_CLASS
          }`}
        />
        {state.errors?.nickname && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{state.errors.nickname}</p>
        )}
      </div>

      {/* Username Field */}
      <div>
        <label htmlFor="username" className={LABEL_CLASS}>
          아이디
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="4~8자의 아이디"
          disabled={isPending}
          defaultValue={state.fields?.username || ""}
          className={`${INPUT_BASE_CLASS} ${
            state.errors?.username ? INPUT_ERROR_CLASS : INPUT_NORMAL_CLASS
          }`}
        />
        {state.errors?.username && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{state.errors.username}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className={LABEL_CLASS}>
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="4~8자의 비밀번호"
          disabled={isPending}
          className={`${INPUT_BASE_CLASS} ${
            state.errors?.password ? INPUT_ERROR_CLASS : INPUT_NORMAL_CLASS
          }`}
        />
        {state.errors?.password && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{state.errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className={LABEL_CLASS}>
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 다시 입력"
          disabled={isPending}
          className={`${INPUT_BASE_CLASS} ${
            state.errors?.confirmPassword ? INPUT_ERROR_CLASS : INPUT_NORMAL_CLASS
          }`}
        />
        {state.errors?.confirmPassword && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{state.errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button type="submit" disabled={isPending} className={BUTTON_CLASS}>
          {isPending ? (
            <>
              <SpinnerIcon className="mr-2 -ml-1 h-4 w-4" />
              가입 중...
            </>
          ) : (
            "가입하기"
          )}
        </button>
      </div>

      <div className="pt-2 text-center">
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-900 transition-all hover:underline hover:underline-offset-4 dark:text-zinc-100"
          >
            로그인
          </Link>
        </p>
      </div>
    </form>
  );
}
