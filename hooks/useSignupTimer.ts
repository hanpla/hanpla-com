"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useSignupTimer() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const navigateToLogin = () => {
    setIsNavigating(true);
    router.push("/login");
  };

  useEffect(() => {
    if (!isSuccess) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsNavigating(true);
          router.push("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuccess, router]);

  return {
    isSuccess,
    countdown,
    isNavigating,
    handleSuccess,
    navigateToLogin,
  };
}
