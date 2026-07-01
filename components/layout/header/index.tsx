import Logo from "@/components/ui/logo";
import Nav from "./nav";

const Header = () => {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-600">
      <div className="wrapper flex items-center justify-between py-2">
        <Logo />
        <Nav />
      </div>
    </header>
  );
};

export default Header;
