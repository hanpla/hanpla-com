import { useActionState } from "react";
import { ActionState, signup } from "@/lib/actions/signup";

const INITIAL_STATE: ActionState = {};

const useSignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signup, INITIAL_STATE);

  return {
    state,
    formAction,
    isPending,
  };
};

export default useSignUpForm;
