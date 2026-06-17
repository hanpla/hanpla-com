import { ReactNode } from "react";
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
          <main className="bg-background text-foreground wrapper transition-colors duration-300">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
