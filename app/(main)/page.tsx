import BestPostBoard from "@/components/post/best-post-board";
import PageTitle from "@/components/ui/page-title";

interface MainPageProps {
  searchParams: Promise<{
    page?: string;
    searchType?: string;
    searchKeyword?: string;
  }>;
}

const MainPage = async ({ searchParams }: MainPageProps) => {
  const resolvedParams = await searchParams;

  return (
    <>
      <PageTitle title="인기 게시글" href="/best" />
      <div className="mt-4">
        <BestPostBoard searchParams={resolvedParams} baseUrl="/best" />
      </div>
    </>
  );
};

export default MainPage;
