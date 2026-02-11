"use client";

import { useState } from "react";

// Components
import MobileMenuModal from "./MobileMenuModal";

// Icons
import { TextAlignJustify } from "lucide-react";

interface Props {
  isLogin: boolean;
}

export default function MobileMenu({ isLogin }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div>
      <MenuButton onClick={openMenu} />
      {isMenuOpen && <MobileMenuModal onClick={closeMenu} isLogin={isLogin} />}
    </div>
  );
}

const MenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="md:hidden p-2" type="button" onClick={onClick}>
      <TextAlignJustify size={20} />
    </button>
  );
};
