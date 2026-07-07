import BestPostBoard from "@/components/post/best-post-board";
import PageTitle from "@/components/ui/page-title";

interface BestPageProps {
  searchParams: Promise<{
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  }>;
}

const BestPage = async ({ searchParams }: BestPageProps) => {
  const resolvedParams = await searchParams;

  return (
    <>
      <PageTitle title="실시간 베스트" />
      <div className="mt-4">
        <BestPostBoard searchParams={resolvedParams} baseUrl="/best" />
      </div>
    </>
  );
};

export default BestPage;
