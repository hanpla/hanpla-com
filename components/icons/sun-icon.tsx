import { SVGProps } from "react";

export default function SunIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m0 13.5V21M9.75 12l-.75-.75M14.25 12l.75-.75M5.636 5.636l1.273 1.273M16.364 16.364l1.273 1.273M3 12h2.25M18.75 12H21M5.636 18.364l1.273-1.273M16.364 7.636l1.273-1.273M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"
      />
    </svg>
  );
}
