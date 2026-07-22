"use client";

import { useActionState } from "react";

import { updatePassword } from "@/lib/actions/profile";
import type { UpdatePasswordActionState } from "@/types/profile";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";

const INITIAL_STATE: UpdatePasswordActionState = {};

const UpdatePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(updatePassword, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <InputField
        label="현재 비밀번호"
        id="currentPassword"
        name="currentPassword"
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        error={state.errors?.currentPassword}
      />

      <InputField
        label="새 비밀번호"
        id="newPassword"
        name="newPassword"
        type="password"
        placeholder="새 비밀번호를 입력하세요 (4~8자)"
        error={state.errors?.newPassword}
      />

      <InputField
        label="새 비밀번호 확인"
        id="confirmNewPassword"
        name="confirmNewPassword"
        type="password"
        placeholder="새 비밀번호를 다시 입력하세요"
        error={state.errors?.confirmNewPassword}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending} size="sm">
          비밀번호 변경
        </Button>
      </div>

      {state.success ? (
        <div className="animate-in fade-in rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-center text-xs font-semibold text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:text-emerald-400">
          비밀번호가 성공적으로 변경되었습니다.
        </div>
      ) : null}

      {state.errors?.global ? (
        <div className="animate-in fade-in rounded-lg border border-red-200 bg-red-50/50 p-3 text-center text-xs font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          {state.errors.global}
        </div>
      ) : null}
    </form>
  );
};

export default UpdatePasswordForm;
