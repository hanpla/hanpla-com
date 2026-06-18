import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ActionState, login } from "@/lib/actions/login";

const INITIAL_STATE: ActionState = {};

const useLoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, isPending] = useActionState(login, INITIAL_STATE);

  useEffect(() => {
    if (state.success) {
      router.replace(callbackUrl);
      router.refresh();
    }
  }, [state.success, callbackUrl, router]);

  return {
    state,
    formAction,
    isPending,
  };
};

export default useLoginForm;
