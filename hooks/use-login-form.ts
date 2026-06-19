import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ActionState, login } from "@/lib/actions/login";
import { useUserStore } from "@/components/providers/user-store-provider";

const INITIAL_STATE: ActionState = {};

const useLoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const setUser = useUserStore((state) => state.setUser);
  const [state, formAction, isPending] = useActionState(login, INITIAL_STATE);

  useEffect(() => {
    if (state.success && state.user) {
      setUser(state.user);
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [state.success, state.user, callbackUrl, router, setUser]);

  return {
    state,
    formAction,
    isPending,
  };
};

export default useLoginForm;
