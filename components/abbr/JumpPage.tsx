"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  totalPages: number;
}

export default function JumpPage({ totalPages }: Props) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleJump = () => {
    const pageNum = parseInt(value);

    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
      alert(`1부터 ${totalPages} 사이의 숫자를 입력해주세요.`);
      setValue("");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (pageNum <= 1) {
      params.delete("page");
    } else {
      params.set("page", pageNum.toString());
    }

    const path = pathname === "/" ? "/board/best" : pathname;
    router.push(`${path}?${params.toString()}`);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleJump();
  };

  return (
    <div className="flex items-center gap-2 group ml-2">
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          min={1}
          max={totalPages}
          inputMode="numeric"
          placeholder="0"
          className="w-12 h-8 px-2 text-center text-sm border border-neutral-200 rounded-md 
                   bg-white text-neutral-900 outline-none transition-all
                   focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <span className="text-[12px] text-neutral-400 font-medium">
        / {totalPages}
      </span>

      <button
        onClick={handleJump}
        className="h-8 px-2 text-[12px] font-semibold text-neutral-500 hover:text-neutral-900 
                   bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
      >
        이동
      </button>
    </div>
  );
}
