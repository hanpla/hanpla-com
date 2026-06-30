import { SVGProps } from "react";

const StrikeIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
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
    <path d="M16 4H9a3 3 0 0 0-2.83 4H18a4 4 0 0 1-3.79 5H6" />
    <line x1="4" x2="20" y1="12" y2="12" />
  </svg>
);

export default StrikeIcon;
