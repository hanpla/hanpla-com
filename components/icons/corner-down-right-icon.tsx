import { SVGProps } from "react";

const CornerDownRightIcon = ({ className = "", ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15 10 4.55 4.55a1 1 0 0 1 0 1.41L15 20.5M4 4v7a4 4 0 0 0 4 4h11.5"
    />
  </svg>
);

export default CornerDownRightIcon;
