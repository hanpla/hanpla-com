"use client";

import SignupForm from "@/components/auth/SignupForm";
import AuthTitle from "@/components/auth/AuthTitle";
import SignupSuccess from "@/components/auth/SignupSuccess";
import useSignupPage from "@/hooks/useSignupPage";

export default function SignupPage() {
  const { isSuccess, isNavigating, handleSuccess, navigateToLogin } = useSignupPage();

  if (isSuccess) {
    return (
      <SignupSuccess
        isNavigating={isNavigating}
        onNavigate={navigateToLogin}
      />
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="animate-in fade-in w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 shadow-xl backdrop-blur-sm duration-300 dark:border-zinc-800 dark:bg-zinc-900/30">
        <AuthTitle title="회원가입" />

        <SignupForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
