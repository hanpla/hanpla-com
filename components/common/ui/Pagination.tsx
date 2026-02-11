"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Utils
import { generatePagination } from "@/libs/utils/generate";

// Components
import JumpPage from "@/components/abbr/JumpPage";

interface Props {
  qs: string;
  currentPage: number;
  totalPage: number;
}

export default function Pagination({ qs, currentPage, totalPage }: Props) {
  const pathname = usePathname();
  const allPages = generatePagination(currentPage, totalPage);
  const params = new URLSearchParams(qs);
  const path = pathname === "/" ? "/board/best" : pathname;

  const createPageUrl = (pageNumber: number) => {
    if (pageNumber <= 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }

    return `${path}?${params.toString()}`;
  };

  return (
    <PaginationLayout>
      <div className="flex items-center gap-1">
        <PaginationText href={createPageUrl(1)} label="처음" />
        <PaginationNumbers
          allPages={allPages}
          createPageUrl={createPageUrl}
          currentPage={currentPage}
        />
        <PaginationText href={createPageUrl(totalPage)} label="마지막" />
      </div>

      <div className="pt-4 w-full flex justify-center">
        <JumpPage totalPages={totalPage} />
      </div>
    </PaginationLayout>
  );
}

const PaginationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-8">
      {children}
    </div>
  );
};

const PaginationText = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link
      className="text-xs transition-colors text-neutral-400 hover:text-neutral-900 px-2 py-1"
      href={href}
    >
      {label}
    </Link>
  );
};

const PaginationNumbers = ({
  allPages,
  createPageUrl,
  currentPage,
}: {
  allPages: number[];
  createPageUrl: (p: number) => string;
  currentPage: number;
}) => {
  return (
    <div className="flex items-center gap-1">
      {allPages.map((page, index) => (
        <PageNumber
          key={index}
          page={page}
          href={createPageUrl(page)}
          isActive={currentPage === page}
        />
      ))}
    </div>
  );
};

const PageNumber = ({
  page,
  href,
  isActive,
}: {
  page: number;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`text-sm min-w-8 text-center transition-colors hover:text-neutral-900 px-2 py-1 ${
        isActive
          ? "font-bold text-neutral-900 underline underline-offset-8 decoration-2"
          : "text-neutral-500"
      }`}
    >
      {page}
    </Link>
  );
};
