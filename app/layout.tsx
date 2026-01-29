import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../libs/styles/globals.css";

// Actions
import { getAllBoards } from "@/libs/actions/board";

// session
import { verifySession } from "@/libs/session/auth";

// Components
import Container from "@/components/layout/Container";
import Header from "@/components/header";

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
        <Header allBoards={allBoards} isLogin={isLogin} nickname={nickname} />
        <main>
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
