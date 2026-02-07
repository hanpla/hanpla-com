import Link from "next/link";

interface Props {
  title: string;
  href?: string;
}

export default function PageTitle({ title, href }: Props) {
  const baseStyle = `font-bold text-neutral-800 inline-block mt-4`;

  if (href) {
    return (
      <Link href={href} className={`${baseStyle}`}>
        {title}
      </Link>
    );
  }

  return <h1 className={baseStyle}>{title}</h1>;
}
