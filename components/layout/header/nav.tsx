import DesktopNav from "./desktop-nav";
import MobileNavTrigger from "./mobile-nav-trigger";
import type { SessionUser } from "@/lib/utils/auth";

interface NavProps {
  user: SessionUser | null;
  toggleMenu: () => void;
}

const Nav = ({ user, toggleMenu }: NavProps) => {
  return (
    <div className="flex items-center justify-between">
      <DesktopNav user={user} />
      <MobileNavTrigger toggleMenu={toggleMenu} />
    </div>
  );
};

export default Nav;

