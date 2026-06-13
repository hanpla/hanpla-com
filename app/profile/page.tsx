import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils/auth";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-xl space-y-6">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
            내 프로필 설정
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            닉네임 및 비밀번호를 안전하게 수정할 수 있습니다.
          </p>
        </div>

        <EditProfileForm initialNickname={user.nickname} userIdStr={user.user_id} />
      </div>
    </div>
  );
}
