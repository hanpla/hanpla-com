import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../libs/styles/globals.css";

// Actions
import { getAllBoards } from "@/libs/actions/board";

// Utils
import { verifySession } from "@/libs/utils/session/auth";

// Components
import Header from "@/components/header/Header";
import { RecentBoard } from "@/components/RecentBoard/RecentBoard";
import PopularBoards from "@/components/PopularBoards/PopularBoards";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ㅇㅅㅇ",
  description: "연습용 게시판",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [allBoards, session] = await Promise.all([
    getAllBoards({}),
    verifySession(),
  ]);
  const isLogin = !!session;
  const nickname = session?.nickname || "ㅇㅇ";

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header isLogin={isLogin} nickname={nickname} allBoards={allBoards} />
        <RecentBoard allBoards={allBoards} />
        <main className="max-w-5xl mx-auto px-4">{children}</main>
        <PopularBoards popularBoards={allBoards} />
      </body>
    </html>
  );
}
