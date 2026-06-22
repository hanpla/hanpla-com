"use client";

import useLoginForm from "@/hooks/use-login-form";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import AuthLink from "./auth-link";

const LoginForm = () => {
  const { state, formAction, isPending, callbackUrl } = useLoginForm();

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <InputField
        label="아이디"
        id="user_id"
        name="user_id"
        defaultValue={state.fields?.user_id || ""}
      />
      <InputField label="비밀번호" id="password" name="password" type="password" />

      <Button type="submit" isLoading={isPending} className="w-full">
        로그인
      </Button>
      {state.errors?.global && (
        <div className="animate-in fade-in rounded-lg border border-red-200 bg-red-50/50 p-3 text-center text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      )}
      <AuthLink text="계정이 없으신가요?" linkText="회원가입" href="/signup" />
    </form>
  );
};

export default LoginForm;
