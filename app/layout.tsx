import type { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import localFont from "next/font/local";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/Header";
import RecentBoardsBar from "@/components/layout/RecentBoardsBar";
import { getSessionUser } from "@/lib/utils/auth";
import Logo from "@/components/layout/Logo";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "hanpla-com website",
};

const HeaderFallback = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-30 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
      <div className="wrapper flex h-16 items-center justify-between">
        <Logo className="transition-opacity hover:opacity-80" />
        {/* Desktop nav fallback skeleton */}
        <div className="hidden items-center gap-4 sm:flex">
          <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-200/80 dark:bg-zinc-850" />
          <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200/80 dark:bg-zinc-850" />
        </div>
        {/* Mobile menu trigger fallback skeleton */}
        <div className="h-8 w-8 animate-pulse rounded-lg bg-zinc-200/80 sm:hidden dark:bg-zinc-850" />
      </div>
    </header>
  );
};

const DynamicHeader = async () => {
  const user = await getSessionUser();
  return <Header user={user} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Suspense fallback={<HeaderFallback />}>
            <DynamicHeader />
          </Suspense>
          <RecentBoardsBar />
          <main className="bg-background text-foreground flex flex-1 flex-col transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
