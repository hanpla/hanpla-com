import { ReactNode } from "react";

import Header from "@/components/layout/header";
import RecentBoardsBar from "@/components/layout/recent-boards/recent-boards-bar";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      <RecentBoardsBar />
      <main className="wrapper mt-2">{children}</main>
    </>
  );
};

export default MainLayout;
