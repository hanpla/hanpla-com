import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import { ActionState, login } from "@/lib/actions/login";

const INITIAL_STATE: ActionState = {};

const useLoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [state, formAction, isPending] = useActionState(login, INITIAL_STATE);

  return {
    state,
    formAction,
    isPending,
    callbackUrl,
  };
};

export default useLoginForm;
