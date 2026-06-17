import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/theme-provider";
import Header from "@/components/layout/header";
import RecentBoardsBar from "@/components/layout/recent-boards-bar";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "hanpla-com website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="ko" className={`${pretendard.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <RecentBoardsBar />
          <main className="wrapper mt-2">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
