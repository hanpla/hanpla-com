"use client";

import { useActionState, useState } from "react";
import { updateNicknameAction, type ProfileActionState } from "@/lib/actions/profile";
import ProfileCard from "./ProfileCard";
import InputField from "@/components/ui/InputField";

interface NicknameFormProps {
  initialNickname: string;
  userIdStr: string;
}

export default function NicknameForm({ initialNickname, userIdStr }: NicknameFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateNicknameAction,
    {} as ProfileActionState
  );

  const [nickname, setNickname] = useState(initialNickname);
  const [prevInitialNickname, setPrevInitialNickname] = useState(initialNickname);

  if (initialNickname !== prevInitialNickname) {
    setPrevInitialNickname(initialNickname);
    setNickname(initialNickname);
  }

  const isButtonDisabled = isPending || nickname.trim() === "" || nickname === initialNickname;

  return (
    <ProfileCard
      title="닉네임 변경"
      description="커뮤니티 활동에 노출될 새로운 이름을 설정해 보세요."
    >
      <form action={formAction} className="mt-4 space-y-4">
        {/* 현재 아이디 필드 (읽기 전용) */}
        <InputField
          label="현재 아이디"
          id="userId"
          type="text"
          value={userIdStr}
          disabled
          className="cursor-not-allowed bg-zinc-100/50 font-mono text-zinc-400 dark:bg-zinc-950/40 dark:text-zinc-600"
        />

        {/* 새 닉네임 필드 */}
        <InputField
          label="새 닉네임 (2~8자)"
          id="nickname"
          name="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="새 닉네임 입력..."
          error={state.errors?.nickname}
          disabled={isPending}
        />

        {/* 성공 피드백 */}
        {state.success && (
          <p className="animate-fade-in text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            닉네임이 성공적으로 변경되었습니다.
          </p>
        )}

        {/* 글로벌 에러 */}
        {state.errors?.global && (
          <p className="animate-fade-in text-xs font-medium text-red-500 dark:text-red-400">
            {state.errors.global}
          </p>
        )}

        <button
          type="submit"
          disabled={isButtonDisabled}
          className="flex w-full cursor-pointer justify-center rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-50 transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:scale-100 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isPending ? "변경 중..." : "닉네임 저장"}
        </button>
      </form>
    </ProfileCard>
  );
}
