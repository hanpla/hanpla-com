import { ReactNode, Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Header from "@/components/layout/header";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "hanpla-com website",
};

const HeaderFallback = () => (
  <header className="bg-background/80 sticky top-0 z-30 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
    <div className="wrapper flex animate-pulse items-center justify-between py-4">
      {/* Logo Skeleton */}
      <div className="h-7 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      {/* Nav Skeleton */}
      <div className="flex items-center gap-6">
        <div className="hidden gap-6 md:flex">
          <div className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-5 w-10 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-8 w-8 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  </header>
);

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Suspense fallback={<HeaderFallback />}>
            <Header />
          </Suspense>
          <main className="bg-background text-foreground wrapper transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
