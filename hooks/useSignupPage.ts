"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useSignupPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const navigateToLogin = () => {
    setIsNavigating(true);
    router.push("/login");
  };

  return {
    isSuccess,
    isNavigating,
    handleSuccess,
    navigateToLogin,
  };
}
