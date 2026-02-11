"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  abbr: string;
}

export default function Taps({ abbr }: Props) {
  const searchParams = useSearchParams();
  const isLikeCount = searchParams.get("likeCount") ? true : false;
  const isBest = abbr === "best" && true;

  return (
    <>
      {!isBest && (
        <Layout>
          <Tabs>
            <Tab
              label="전체글"
              href={`/board/${abbr}?`}
              isActive={!isLikeCount}
            />
            <Tab
              label="인기글"
              href={`/board/${abbr}?likeCount=10`}
              isActive={isLikeCount}
            />
          </Tabs>
          <Tab label="글쓰기" href={`/board/${abbr}/write`} isActive={false} />
        </Layout>
      )}
    </>
  );
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex justify-between">{children}</div>;
};

const Tabs = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex bg-neutral-100 p-1 rounded-lg">{children}</div>;
};

const Tab = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`
        text-xs sm:text-sm px-4 py-1.5 rounded-md transition-all duration-200 font-medium
        ${
          isActive
            ? "bg-white text-neutral-900 shadow-sm"
            : "text-neutral-500 hover:text-neutral-800 hover:bg-white/50"
        }
      `}
    >
      {label}
    </Link>
  );
};
