import Link from "next/link";

interface BoardHeaderUIProps {
  name: string;
  abbr: string;
  desc?: string;
}

const BoardHeaderUI = ({ name, abbr, desc }: BoardHeaderUIProps) => {
  const href = abbr === "best" ? "/" : `/board/${abbr}`;

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        <Link href={href}>{name}</Link>
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {desc || `${name} 주제에 관해 자유롭게 소통하는 공간입니다.`}
      </p>
    </div>
  );
};

export default BoardHeaderUI;
