import Link from "next/link";

interface BoardHeaderUIProps {
  name: string;
  abbr: string;
}

const BoardHeaderUI = ({ name, abbr }: BoardHeaderUIProps) => {
  const href = abbr === "best" ? "/" : `/board/${abbr}`;

  return (
    <>
      <h1 className="py-2 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        <Link href={href}>{name}</Link>
      </h1>
    </>
  );
};

export default BoardHeaderUI;
