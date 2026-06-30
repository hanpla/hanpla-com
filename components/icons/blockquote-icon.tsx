import { SVGProps } from "react";

const BlockquoteIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
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
    <path d="M17 6h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
    <path d="M3 6h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
    <path d="M10 18h1" />
    <path d="M21 18h-1" />
  </svg>
);

export default BlockquoteIcon;
