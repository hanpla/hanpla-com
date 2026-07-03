import Link from "next/link";

interface PageTitleProps {
  title: string;
  href?: string;
}

const TITLE_STYLE = "text-base font-bold tracking-tighter text-zinc-700 dark:text-zinc-300 mb-4";

const PageTitle = ({ title, href }: PageTitleProps) => {
  if (href) {
    return (
      <Link href={href} className={TITLE_STYLE}>
        {title}
      </Link>
    );
  }
  return <h1 className={TITLE_STYLE}>{title}</h1>;
};

export default PageTitle;
