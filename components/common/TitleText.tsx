import Link from "next/link";

interface Props {
  title: string;
  href?: string;
}

export default function PageTitle({ title, href }: Props) {
  const baseStyle = `font-bold text-neutral-800 mt-2`;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <h1 className={`${baseStyle}`}>{title}</h1>
      </Link>
    );
  }

  return <h1 className={baseStyle}>{title}</h1>;
}
