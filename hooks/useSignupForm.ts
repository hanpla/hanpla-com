"use client";

import { useActionState, useEffect, useState } from "react";
import { signup, type ActionState } from "@/lib/actions/signup";

export default function useSignupForm(onSuccess: () => void) {
  const initialState: ActionState = {};
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const [clearedFields, setClearedFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  const handleFocus = (field: string) => {
    setClearedFields((prev) => ({
      ...prev,
      [field]: true,
      global: true,
    }));
  };

  const handleFormSubmit = () => {
    setClearedFields({});
  };

  return {
    state,
    formAction,
    isPending,
    clearedFields,
    handleFocus,
    handleFormSubmit,
  };
}
