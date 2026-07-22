"use client";

import { useActionState } from "react";

import { updateNickname } from "@/lib/actions/profile";
import type { UpdateNicknameActionState } from "@/types/profile";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";

interface UpdateNicknameFormProps {
  currentNickname: string;
}

const INITIAL_STATE: UpdateNicknameActionState = {};

const UpdateNicknameForm = ({ currentNickname }: UpdateNicknameFormProps) => {
  const [state, formAction, isPending] = useActionState(updateNickname, INITIAL_STATE);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <InputField
        label="닉네임"
        id="nickname"
        name="nickname"
        defaultValue={state.fields?.nickname ?? currentNickname}
        placeholder="새 닉네임을 입력하세요 (2~8자)"
        error={state.errors?.nickname}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending} size="sm">
          닉네임 변경
        </Button>
      </div>

      {state.success ? (
        <div className="animate-in fade-in rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-center text-xs font-semibold text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:text-emerald-400">
          닉네임이 성공적으로 변경되었습니다.
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

export default UpdateNicknameForm;
