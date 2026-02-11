// Actions
import { getAbbrName } from "@/libs/actions/board";

// Components
import PageHeader from "@/components/common/ui/PageHeader";

type Params = Promise<{ abbr: string }>;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { abbr } = await params;
  const abbrName = abbr === "best" ? "인기 게시판" : await getAbbrName(abbr);

  return (
    <>
      <PageHeader title={abbrName} href={`/board/${abbr}`} />
      {children}
    </>
  );
}
