import { Suspense } from "react";

import Logo from "@/components/ui/logo";
import DynamicNav from "./dynamic-nav";
import NavFallback from "./nav-fallback";

const Header = () => {
  return (
    <header className="bg-background/80 sticky top-0 z-30 border-b border-zinc-200 backdrop-blur-md dark:border-zinc-800/80">
      <div className="wrapper flex items-center justify-between py-4">
        <Logo />
        <Suspense fallback={<NavFallback />}>
          <DynamicNav />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;




