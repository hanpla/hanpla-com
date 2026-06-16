import type { Metadata } from "next";
import { ReactNode } from "react";
import localFont from "next/font/local";
import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/ThemeProvider";
import RecentBoardsBar from "@/components/layout/RecentBoardsBar";
import Header from "@/components/layout/Header";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "hanpla-com website",
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
      <body className="flex flex-col">
        <ThemeProvider>
          <Header />
          <RecentBoardsBar />
          <main className="bg-background text-foreground flex flex-1 flex-col transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
