import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";
import ThemeProvider from "@/components/providers/theme-provider";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
