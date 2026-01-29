"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

// Actions
import { loginAction } from "@/libs/actions/auth";

// Components
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthMsg from "@/components/auth/AuthMsg";
import AuthBtn from "@/components/auth/AuthBtns";

// Types
import { AuthState } from "@/libs/types/auth";

export default function LoginPage() {
  const initialState: AuthState = {
    success: false,
    inputs: { userId: "" },
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <AuthLayout title="로그인" description="커뮤니티에 오신 것을 환영합니다!">
      <form action={formAction} className="flex flex-col gap-6">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
          placeholder="비밀번호를 입력해주세요"
        />
        <AuthBtn isPending={isPending} text="로그인" />
        {state.message && <AuthMsg text={state.message} />}
        <AuthLinks />
      </form>
    </AuthLayout>
  );
}

function AuthLinks() {
  return (
    <div className="flex justify-center gap-4 text-sm text-neutral-500 mt-2">
      <button type="button" className="hover:underline">
        아이디 찾기
      </button>
      <span className="text-neutral-300">|</span>
      <button type="button" className="hover:underline">
        비밀번호 찾기
      </button>
      <span className="text-neutral-300">|</span>
      <Link
        href="/signup"
        className="hover:underline font-medium text-neutral-800"
      >
        회원가입
      </Link>
    </div>
  );
}
