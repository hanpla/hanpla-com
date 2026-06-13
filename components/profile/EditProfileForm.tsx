"use client";

import Link from "next/link";
import NicknameForm from "./NicknameForm";
import PasswordForm from "./PasswordForm";

interface EditProfileFormProps {
  initialNickname: string;
  userIdStr: string;
}

export default function EditProfileForm({ initialNickname, userIdStr }: EditProfileFormProps) {
  return (
    <div className="w-full space-y-6">
      {/* 닉네임 변경 폼 */}
      <NicknameForm initialNickname={initialNickname} userIdStr={userIdStr} />

      {/* 비밀번호 변경 폼 */}
      <PasswordForm />

      {/* 홈 바로가기 */}
      <div className="pt-2 text-center">
        <Link
          href="/"
          className="inline-flex w-full justify-center rounded-xl border border-zinc-200 bg-white/40 px-4 py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
        >
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
