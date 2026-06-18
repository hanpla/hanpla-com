"use client";

import { useActionState, useState } from "react";

import { ActionState, signup } from "@/lib/actions/signup";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import AuthLink from "./auth-link";

const INITIAL_STATE: ActionState = {};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, INITIAL_STATE);
  const [clearedFields, setClearedFields] = useState<Record<string, boolean>>({});

  const handleFocus = (field: string) => {
    setClearedFields((prev) => ({
      ...prev,
      [field]: true,
      global: true,
    }));
  };

  const handleFormSubmit = () => {
    setClearedFields({});
  };

  return (
    <form action={formAction} onSubmit={handleFormSubmit} className="space-y-4" noValidate>
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
        error={
          isPending || clearedFields.confirmPassword ? undefined : state.errors?.confirmPassword
        }
        onFocus={() => handleFocus("confirmPassword")}
      />
      <Button type="submit" disabled={isPending} className="w-full">
        회원가입
      </Button>
      <AuthLink text="이미 회원이신가요?" linkText="로그인" href="/login" />
    </form>
  );
};

export default SignupForm;
