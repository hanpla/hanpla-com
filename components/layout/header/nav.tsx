import DesktopNav from "./desktop-nav";
import MobileNavTrigger from "./mobile-nav-trigger";

interface NavProps {
  toggleMenu: () => void;
}

const Nav = ({ toggleMenu }: NavProps) => (
  <div className="flex items-center justify-between">
    <DesktopNav />
    <MobileNavTrigger toggleMenu={toggleMenu} />
  </div>
);

export default Nav;
