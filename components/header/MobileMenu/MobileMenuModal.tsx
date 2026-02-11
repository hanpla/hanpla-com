import Link from "next/link";

// Components
import { ModalLayout } from "@/components/layout/ModalLayout";
import {
  LoginSignupLinks,
  ProfileLogoutLinks,
} from "../headerActions/NavLinks";

// Icons
import { X } from "lucide-react";

// Types
interface Props {
  onClick: () => void;
  isLogin: boolean;
}

const baseStyle = "px-4 py-2 hover:bg-neutral-100 text-left";

export default function MobileMenuModal({ onClick, isLogin }: Props) {
  return (
    <ModalLayout onClose={onClick}>
      <ModalContainer>
        <ModalCloseBtn onClose={onClick} />
        <ModalItems isLogin={isLogin} />
      </ModalContainer>
    </ModalLayout>
  );
}

const ModalContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 right-0 z-20 w-70 h-full bg-white shadow-2xl flex flex-col p-6 pl-0 pt-3">
      {children}
    </div>
  );
};

const ModalCloseBtn = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="flex justify-end mb-8">
      <button onClick={onClose} className="p-1 cursor-pointer">
        <X size={24} className="text-neutral-600" />
      </button>
    </div>
  );
};

const ModalItems = ({ isLogin }: { isLogin: boolean }) => {
  return (
    <>
      <Link href={"/board"} className={baseStyle}>
        전체 게시판
      </Link>
      {isLogin ? (
        <ProfileLogoutLinks className={baseStyle} />
      ) : (
        <LoginSignupLinks className={baseStyle} />
      )}
    </>
  );
};
