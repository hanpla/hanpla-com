import { SVGProps } from "react";

const BulletListIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
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
    <line x1="9" x2="20" y1="6" y2="6" />
    <line x1="9" x2="20" y1="12" y2="12" />
    <line x1="9" x2="20" y1="18" y2="18" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </svg>
);

export default BulletListIcon;
