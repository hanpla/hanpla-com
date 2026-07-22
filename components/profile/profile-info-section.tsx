import type { SessionUser } from "@/types/auth";
import UpdateNicknameForm from "./update-nickname-form";
import UpdatePasswordForm from "./update-password-form";

interface ProfileInfoSectionProps {
  user: SessionUser;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProps) => {
  return (
    <div className="space-y-8">
      {/* 닉네임 변경 카드 */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-100">
          기본 정보 수정
        </h2>
        <div className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-700 dark:text-zinc-300">아이디:</span>{" "}
          {user.user_id} (아이디는 변경할 수 없습니다)
        </div>
        <UpdateNicknameForm currentNickname={user.nickname} />
      </section>

      {/* 비밀번호 변경 카드 */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-100">비밀번호 수정</h2>
        <UpdatePasswordForm />
      </section>
    </div>
  );
};

export default ProfileInfoSection;
