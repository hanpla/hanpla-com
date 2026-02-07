"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Components
import PageTitle from "../common/TitleText";

interface Props {
  abbrName: string;
  href: string;
  isBest: boolean;
}

export default function AbbrHeader({ abbrName, href, isBest }: Props) {
  const searchParams = useSearchParams();
  const isLikeCount = searchParams.get("likeCount") ? true : false;

  return (
    <HeaderLayout>
      <PageTitle title={abbrName} href={href} />
      {!isBest && (
        <Tabs>
          <Tab label="전체글" href={`${href}?`} isActive={!isLikeCount} />
          <Tab
            label="인기글"
            href={`${href}?likeCount=10`}
            isActive={isLikeCount}
          />
        </Tabs>
      )}
    </HeaderLayout>
  );
}

const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
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
