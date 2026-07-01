import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";
import Nav from "./nav";

const Header = () => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-600">
      <div className="wrapper flex items-center justify-between py-2">
        <Logo />
        <div className="flex items-center gap-6">
          <Nav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
