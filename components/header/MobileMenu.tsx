"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// Utils
import { generateCallbackUrl } from "@/libs/utils/utils";

// Icons
import { TextAlignJustify, X } from "lucide-react";

// Components
import ModalLayout from "../layout/ModalLayout";
import LogoutBtn from "../common/LogoutBtn";

export default function MobileMenu({ isLogin }: { isLogin: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const callbackUrl = generateCallbackUrl(pathname, searchParams.toString());

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
      <MobileMenuButton onClick={openMenu} />
      {isMenuOpen && (
        <MobileMenuModal
          onClose={closeMenu}
          callbackUrl={callbackUrl}
          isLogin={isLogin}
        />
      )}
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

const MobileMenuModal = ({
  onClose,
  callbackUrl,
  isLogin,
}: {
  onClose: () => void;
  callbackUrl: string;
  isLogin: boolean;
}) => {
  return (
    <>
      <ModalLayout onClose={onClose} />
      <ModalContainer>
        <ModalClose onClose={onClose} />
        {isLogin ? (
          <ModalLoggedInItems />
        ) : (
          <ModalLoggedOutItems callbackUrl={callbackUrl} />
        )}
      </ModalContainer>
    </>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 right-0 z-20 w-70 h-full bg-white shadow-2xl flex flex-col p-6 pl-0 pt-3">
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

const ModalLoggedInItems = () => {
  const items = [
    { href: "/board", label: "전체 게시판" },
    { href: "/profile", label: "프로필" },
  ];

  return (
    <ModalItemsLayout>
      {items.map((item) => (
        <ModalItem key={item.href} href={item.href} label={item.label} />
      ))}
      <ModalItem href={""} label={""} isBtn />
    </ModalItemsLayout>
  );
};

const ModalLoggedOutItems = ({ callbackUrl }: { callbackUrl: string }) => {
  const items = [
    { href: "/board", label: "전체 게시판" },
    {
      href: `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`,
      label: "로그인",
    },
    { href: "/signup", label: "회원가입" },
  ];

  return (
    <ModalItemsLayout>
      {items.map((item) => (
        <ModalItem key={item.href} href={item.href} label={item.label} />
      ))}
    </ModalItemsLayout>
  );
};

const ModalItemsLayout = ({ children }: { children: React.ReactNode }) => {
  return <nav className="flex flex-col gap-2 text-lg">{children}</nav>;
};

const ModalItem = ({
  href,
  label,
  isBtn,
}: {
  href: string;
  label: string;
  isBtn?: boolean;
}) => {
  const baseStyle = "px-4 py-2 hover:bg-neutral-100 text-left";
  if (isBtn) return <LogoutBtn className={baseStyle} />;

  return (
    <Link href={href} className="px-4 py-2 hover:bg-neutral-100">
      {label}
    </Link>
  );
};
