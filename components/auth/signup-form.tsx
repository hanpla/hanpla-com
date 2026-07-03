"use client";

import useSignUpForm from "@/hooks/use-signup-form";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import AuthLink from "./auth-link";

const SignUpForm = () => {
  const { state, formAction, isPending } = useSignUpForm();

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <InputField
        label="닉네임"
        id="nickname"
        name="nickname"
        defaultValue={state.fields?.nickname || ""}
        placeholder="2~8자 이내"
        error={state.errors?.nickname}
      />

      <InputField
        label="아이디"
        id="user_id"
        name="user_id"
        defaultValue={state.fields?.user_id || ""}
        placeholder="4~8자 이내"
        error={state.errors?.user_id}
      />

      <InputField
        label="비밀번호"
        id="password"
        name="password"
        type="password"
        placeholder="4~8자 이내"
        error={state.errors?.password}
      />

      <InputField
        label="비밀번호 확인"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        error={state.errors?.confirmPassword}
      />

      <Button type="submit" isLoading={isPending} className="w-full">
        회원가입
      </Button>

      {state.errors?.global && (
        <div className="animate-in fade-in rounded-lg border border-red-200 bg-red-50/50 p-3 text-center text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      )}

      <AuthLink text="이미 계정이 있으신가요?" linkText="로그인" href="/login" />
    </form>
  );
};

export default SignUpForm;
