"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Utils
import { generatePagination } from "@/libs/utils/utils";

interface Props {
  href: string;
  currentPage: number;
  totalPage: number;
}

export default function Pagination({ href, currentPage, totalPage }: Props) {
  const searchParams = useSearchParams();
  const allPages = generatePagination(currentPage, totalPage);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Number(pageNumber) <= 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }
    const qs = params.toString();
    return `${href}${qs ? `?${qs}` : ""}`;
  };

  return (
    <PaginationLayout>
      <PaginationText href={createPageUrl(1)} label="처음" />
      <PaginationNumbers
        allPages={allPages}
        createPageUrl={createPageUrl}
        currentPage={currentPage}
      />
      <PaginationText href={createPageUrl(totalPage)} label="마지막" />
    </PaginationLayout>
  );
}

const PaginationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
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
