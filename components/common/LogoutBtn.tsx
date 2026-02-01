// Actions
import { logoutAction } from "@/libs/actions/auth";

export default function LogoutBtn({ className = "" }: { className?: string }) {
  return (
    <button
      className={`${className} text-neutral-800 cursor-pointer`}
      onClick={logoutAction}
    >
      로그아웃
    </button>
  );
}
