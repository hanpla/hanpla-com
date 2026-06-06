import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/utils/auth";

const ROW_CLASS = "py-4 flex justify-between items-center";
const LABEL_CLASS = "font-medium text-zinc-500 dark:text-zinc-400";
const VALUE_CLASS = "font-semibold text-zinc-900 dark:text-zinc-100";
const VALUE_MONO_CLASS = "font-mono text-zinc-950 dark:text-zinc-50";

export default async function ProfilePage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6 transition-colors duration-300">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            내 프로필
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">가입된 회원 정보입니다.</p>
        </div>

        <div className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
          <div className={ROW_CLASS}>
            <span className={LABEL_CLASS}>닉네임</span>
            <span className={VALUE_CLASS}>{user.nickname}</span>
          </div>
          <div className={ROW_CLASS}>
            <span className={LABEL_CLASS}>아이디</span>
            <span className={VALUE_MONO_CLASS}>{user.user_id}</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link
            href="/"
            className="inline-flex w-full justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-50 transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
