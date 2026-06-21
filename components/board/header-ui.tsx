import Link from "next/link";

interface BoardHeaderUIProps {
  name: string;
  abbr: string;
}

const BoardHeaderUI = ({ name, abbr }: BoardHeaderUIProps) => {
  return (
    <div className="border-b border-zinc-200 pb-5 dark:border-zinc-800/80">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        <Link href={`/board/${abbr}`}>{name}</Link>
      </h1>
      <p className="mt-2 text-sm break-keep text-zinc-500 dark:text-zinc-400">
        {`${name} 주제에 관해 자유롭게 소통하는 공간입니다.`}
      </p>
    </div>
  );
};

export default BoardHeaderUI;
