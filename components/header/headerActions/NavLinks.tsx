import Link from "next/link";

// Components
import LogoutBtn from "@/components/common/btn/LogoutBtn";

interface Props {
  isLogin: boolean;
}

const baseStyle = "hover:text-neutral-800";

export default function NavLinks({ isLogin }: Props) {
  return (
    <Container>
      <Link href="/board" className={baseStyle}>
        전체 게시판
      </Link>

      <LinksWrapper>
        {isLogin ? (
          <ProfileLogoutLinks className={baseStyle} />
        ) : (
          <LoginSignupLinks className={baseStyle} />
        )}
      </LinksWrapper>
    </Container>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden md:flex items-center gap-3 text-sm font-medium text-neutral-600">
      {children}
    </div>
  );
};

const LinksWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3 border-l pl-3 border-neutral-200">
      {children}
    </div>
  );
};

export const loginSignupItems = [
  {
    href: "/login",
    label: "로그인",
  },
  {
    href: "/signup",
    label: "회원가입",
  },
];

export const profileLogoutItems = [
  {
    href: "/profile",
    label: "프로필",
  },
  {
    href: "",
    label: "로그아웃",
    btn: true,
  },
];

export const LoginSignupLinks = ({ className }: { className?: string }) => {
  return (
    <>
      {loginSignupItems.map((item) => (
        <Link key={item.label} href={item.href} className={className}>
          {item.label}
        </Link>
      ))}
    </>
  );
};

export const ProfileLogoutLinks = ({ className }: { className?: string }) => {
  return (
    <>
      {profileLogoutItems.map((item) =>
        item.btn ? (
          <LogoutBtn key={item.label} className={className} />
        ) : (
          <Link key={item.label} href={item.href} className={className}>
            {item.label}
          </Link>
        ),
      )}
    </>
  );
};
