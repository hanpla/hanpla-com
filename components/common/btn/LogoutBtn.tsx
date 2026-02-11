// Actions
import { logoutAction } from "@/libs/actions/auth";

interface Props {
  className?: string;
}

export default function LogoutBtn({ className }: Props) {
  return (
    <button onClick={logoutAction} className={`cursor-pointer ${className}`}>
      로그아웃
    </button>
  );
}
