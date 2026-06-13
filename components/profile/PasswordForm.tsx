"use client";

import { useActionState, useRef } from "react";
import { updatePasswordAction, type ProfileActionState } from "@/lib/actions/profile";
import ProfileCard from "./ProfileCard";
import InputField from "@/components/ui/InputField";

export default function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // 폼 액션 래핑: 성공 시 입력창 초기화
  const handlePasswordAction = async (prevState: ProfileActionState, formData: FormData) => {
    const result = await updatePasswordAction(prevState, formData);
    if (result.success) {
      formRef.current?.reset();
    }
    return result;
  };

  const [state, formAction, isPending] = useActionState(
    handlePasswordAction,
    {} as ProfileActionState
  );

  return (
    <ProfileCard
      title="비밀번호 변경"
      description="계정 보안을 지키기 위해 주기적으로 수정하는 것이 좋습니다."
    >
      <form ref={formRef} action={formAction} className="mt-4 space-y-4">
        {/* 현재 비밀번호 */}
        <InputField
          label="현재 비밀번호"
          id="currentPassword"
          name="currentPassword"
          type="password"
          placeholder="현재 비밀번호 입력"
          error={state.errors?.currentPassword}
          disabled={isPending}
        />

        {/* 새 비밀번호 */}
        <InputField
          label="새 비밀번호 (4~8자)"
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="새 비밀번호 입력"
          error={state.errors?.newPassword}
          disabled={isPending}
        />

        {/* 새 비밀번호 확인 */}
        <InputField
          label="새 비밀번호 확인"
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          placeholder="새 비밀번호 다시 입력"
          error={state.errors?.confirmNewPassword}
          disabled={isPending}
        />

        {/* 성공 피드백 */}
        {state.success && (
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-fade-in">
            비밀번호가 성공적으로 변경되었습니다.
          </p>
        )}

        {/* 글로벌 에러 */}
        {state.errors?.global && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400 animate-fade-in">
            {state.errors.global}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex w-full cursor-pointer justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:scale-100 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isPending ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </ProfileCard>
  );
}
