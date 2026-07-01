import { ReactNode } from "react";

import Header from "@/components/layout/header";

const MainLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="wrapper pt-2">{children}</main>
    </>
  );
};

export default MainLayout;
