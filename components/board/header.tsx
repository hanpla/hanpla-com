import { getBoardByAbbr } from "@/lib/queries/board";
import { notFound } from "next/navigation";

interface HeaderProps {
  abbr: string;
}

const Header = async ({ abbr }: HeaderProps) => {
  const res = await getBoardByAbbr(abbr);

  if (!res) {
    notFound();
  }

  return <div>{res.name}</div>;
};

export default Header;
