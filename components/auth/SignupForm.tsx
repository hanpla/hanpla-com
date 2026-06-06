"use client";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import InputField from "@/components/ui/InputField";
import AuthLink from "@/components/auth/AuthLink";
import useSignupForm from "@/hooks/useSignupForm";

const BUTTON_CLASS =
  "w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-50 font-medium hover:bg-zinc-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 focus:ring-offset-background dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-100 dark:focus:ring-offset-background transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

interface SignupFormProps {
  onSuccess: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const {
    state,
    formAction,
    isPending,
    clearedFields,
    handleFocus,
    handleFormSubmit,
  } = useSignupForm(onSuccess);

  return (
    <form
      action={formAction}
      onSubmit={handleFormSubmit}
      className="space-y-4"
      noValidate
    >
      {state.errors?.global && !isPending && !clearedFields.global && (
        <div className="bg-red-55/10 rounded-lg border border-red-200 p-3.5 text-xs font-medium text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      )}

      <InputField
        id="nickname"
        name="nickname"
        label="닉네임"
        type="text"
        placeholder="2~8자의 닉네임"
        disabled={isPending}
        defaultValue={state.fields?.nickname || ""}
        error={isPending || clearedFields.nickname ? undefined : state.errors?.nickname}
        onFocus={() => handleFocus("nickname")}
      />

      <InputField
        id="user_id"
        name="user_id"
        label="아이디"
        type="text"
        placeholder="4~8자의 아이디"
        disabled={isPending}
        defaultValue={state.fields?.user_id || ""}
        error={isPending || clearedFields.user_id ? undefined : state.errors?.user_id}
        onFocus={() => handleFocus("user_id")}
      />

      <InputField
        id="password"
        name="password"
        label="비밀번호"
        type="password"
        placeholder="4~8자의 비밀번호"
        disabled={isPending}
        error={isPending || clearedFields.password ? undefined : state.errors?.password}
        onFocus={() => handleFocus("password")}
      />

      <InputField
        id="confirmPassword"
        name="confirmPassword"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호 다시 입력"
        disabled={isPending}
        error={isPending || clearedFields.confirmPassword ? undefined : state.errors?.confirmPassword}
        onFocus={() => handleFocus("confirmPassword")}
      />

      {/* Submit Button */}
      <div className="pt-2">
        <button type="submit" disabled={isPending} className={BUTTON_CLASS}>
          {isPending ? (
            <>
              가입 중...
              <SpinnerIcon className="-mr-1 ml-2 h-4 w-4" />
            </>
          ) : (
            "가입하기"
          )}
        </button>
      </div>

      <AuthLink text="이미 계정이 있으신가요?" linkText="로그인" href="/login" />
    </form>
  );
}
