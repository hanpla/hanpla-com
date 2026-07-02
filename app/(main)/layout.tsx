import { ReactNode } from "react";

export const dynamic = "force-dynamic";

import Header from "@/components/layout/header";
import RecentBoard from "@/components/layout/recent-board";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      <RecentBoard />
      <main className="wrapper pt-2">{children}</main>
    </>
  );
};

export default MainLayout;
