import { SVGProps } from "react";

const BoldIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M14 12a4 4 0 0 0 0-8H6v8" />
    <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
  </svg>
);

export default BoldIcon;
