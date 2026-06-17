import { SVGProps } from "react";

export default function ChatBubbleIcon({ className = "", ...props }: SVGProps<SVGSVGElement>) {
  return (
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
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.92 1.786c-.082.095-.08.24.017.317.098.077.237.074.33-.007a6.294 6.294 0 0 0 2.222-1.39c.454.12.93.185 1.416.185.08 0 .16-.002.24-.005"
      />
    </svg>
  );
}
