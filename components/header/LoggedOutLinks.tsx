import Link from "next/link";

const AUTH_LINKS = [
  { label: "전체 게시판", href: "/board" },
  { label: "로그인", href: "/login" },
  { label: "회원가입", href: "/signup" },
];

export default function LoggedOutLinks() {
  return (
    <div className="hidden md:flex items-center gap-4">
      {AUTH_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-neutral-800"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
