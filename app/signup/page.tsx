"use client";

import Link from "next/link";
import { useActionState } from "react";

// Actions
import { signupAction } from "@/libs/actions/auth";

// Components
import AuthBtn from "@/components/auth/AuthBtns";
import AuthInput from "@/components/auth/AuthInput";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthMsg from "@/components/auth/AuthMsg";

// Types
import { AuthState } from "@/libs/types/auth";

export default function SignupPage() {
  const initialState: AuthState = {
    success: false,
    inputs: { userId: "", userNickname: "", userPassword: "" },
  };
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );
  return (
    <AuthLayout title="회원가입" description="커뮤니티에 오신 것을 환영합니다!">
      <form action={formAction} className="flex flex-col gap-6">
        <AuthInput
          label="닉네임"
          id="userNickname"
          name="userNickname"
          minLength={2}
          defaultValue={state.inputs?.userNickname || ""}
          placeholder="닉네임을 입력해주세요"
        />
        <AuthInput
          label="아이디"
          id="userId"
          name="userId"
          minLength={4}
          defaultValue={state.inputs?.userId || ""}
          placeholder="아이디를 입력해주세요"
        />
        <AuthInput
          label="비밀번호"
          id="userPassword"
          name="userPassword"
          type="password"
          minLength={4}
          defaultValue={state.inputs?.userPassword || ""}
          placeholder="비밀번호를 입력해주세요"
        />
        {state.message && <AuthMsg text={state.message} />}
        <AuthBtn isPending={isPending} text="회원가입" />
        <AuthLinks />
      </form>
    </AuthLayout>
  );
}

function AuthLinks() {
  return (
    <div className="flex justify-center gap-4 text-sm text-neutral-500 mt-2">
      <span>이미 회원이시신가요?</span>
      <Link
        href="/login"
        className="hover:underline font-medium text-neutral-800"
      >
        로그인
      </Link>
    </div>
  );
}
