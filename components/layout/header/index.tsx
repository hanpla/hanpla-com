import { getSessionUser } from "@/lib/utils/auth";
import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import Nav from "./nav";
import MobileMenu from "./mobile-menu";

const Header = async () => {
  const user = await getSessionUser();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-600">
      <div className="wrapper flex items-center justify-between py-2">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Nav user={user} />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation Drawer */}
        <MobileMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
