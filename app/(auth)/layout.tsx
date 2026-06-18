import { ReactNode } from "react";

import AuthHeader from "@/components/auth/header";

const AuthLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50/50 p-4 dark:bg-zinc-950/50">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900 dark:shadow-2xl/10">
        <AuthHeader />
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
