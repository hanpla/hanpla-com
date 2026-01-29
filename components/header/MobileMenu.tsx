"use client";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// Utils
import { generateCallbackUrl } from "@/libs/utils/utils";

// Icons
import { TextAlignJustify, X } from "lucide-react";

// Components
import ModalLayout from "../layout/ModalLayout";
import LogoutBtn from "../common/LogoutBtn";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
      <MobileMenuButton onClick={openMenu} />
      {isMenuOpen && <MobileMenuModal onClose={closeMenu} />}
    </>
  );
}

const MobileMenuButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="md:hidden p-2" type="button" onClick={onClick}>
      <TextAlignJustify size={20} />
    </button>
  );
};

const MobileMenuModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <ModalLayout onClose={onClose} />
      <ModalContainer>
        <ModalClose onClose={onClose} />
        <ModalLoggedInItems isLogin={false} />
      </ModalContainer>
    </>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 right-0 z-20 w-70 h-full bg-white shadow-2xl flex flex-col p-6 pt-3">
      {children}
    </div>
  );
};

const ModalClose = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex justify-end mb-8">
      <button onClick={onClose} className="p-1 cursor-pointer">
        <X size={24} className="text-neutral-600" />
      </button>
    </div>
  );
};

const ModalLoggedInItems = ({ isLogin }: { isLogin: boolean }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const callbackUrl = generateCallbackUrl(pathname, searchParams.toString());

  return (
    <nav className="flex flex-col gap-6 text-lg">
      <Link href="/board">전체 게시판 </Link>
      {isLogin ? (
        <>
          <Link href="/profile">프로필</Link>
          <LogoutBtn className="text-left" />
        </>
      ) : (
        <>
          <Link href={`/login?callbackUrl=${callbackUrl}`}>로그인</Link>
          <Link href="signup">회원가입</Link>
        </>
      )}
    </nav>
  );
};
