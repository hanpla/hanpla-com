import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../libs/styles/globals.css";
import Link from "next/link";

// Actions
import { getAllBoards } from "@/libs/actions/board";

// Components
import Logo from "@/components/header/Logo";
import Search from "@/components/header/Search";
import LoggedInLinks from "@/components/header/LoggedInLinks";
import LoggedOutLinks from "@/components/header/LoggedOutLinks";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hanpla-com",
  description: "ㅇㅅㅇ",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allBoards = await getAllBoards({});
  const isLogin = false;
  const nickname = "한플라";

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-neutral-200">
          <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-2">
              <Search allBoards={allBoards} />
              {isLogin ? (
                <LoggedInLinks nickname={nickname} />
              ) : (
                <LoggedOutLinks />
              )}
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
