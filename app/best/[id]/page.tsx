import { getPostById, getBestPosts } from "@/lib/queries/posts";
import PostDetailView from "@/components/post/PostDetailView";
import BoardDesktopTable from "@/components/board/BoardDesktopTable";
import BoardMobileStack from "@/components/board/BoardMobileStack";
import BoardPagination from "@/components/board/BoardPagination";
import BoardSearchArea from "@/components/board/BoardSearchArea";
import BoardHeader from "@/components/board/BoardHeader";
import { notFound } from "next/navigation";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type BestPostPageParams = Promise<{
  id: string;
}>;

export type BestPostPageSearchParams = Promise<{
  page?: string;
  searchType?: string;
  searchKeyword?: string;
}>;

export interface BestPostPageProps {
  params: BestPostPageParams;
  searchParams: BestPostPageSearchParams;
}

export async function generateMetadata({ params }: BestPostPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    return { title: "게시글 - hanpla-com" };
  }

  const post = await getPostById(postId);

  return {
    title: post ? `${post.title} - 인기 게시판` : "게시글 - hanpla-com",
    description: post ? `${post.title} 본문 내용을 확인해 보세요.` : undefined,
  };
}

export default async function BestPostPage({ params, searchParams }: BestPostPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { id } = resolvedParams;
  const { page, searchType, searchKeyword } = resolvedSearchParams;

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    notFound();
  }

  const currentPage = parseInt(page || "1", 10) || 1;
  const pageSize = DEFAULT_PAGE_SIZE;

  // Fetch post detail and best posts list in parallel
  const [post, { posts, totalCount }] = await Promise.all([
    getPostById(postId),
    getBestPosts(currentPage, pageSize, searchType, searchKeyword),
  ]);

  if (!post) {
    notFound();
  }

  const basePath = `/best/${id}`;
  const currentSearchParams = {
    page,
    searchType,
    searchKeyword,
  };

  return (
    <div className="wrapper space-y-6 py-8">
      {/* Header */}
      <BoardHeader
        title="인기 게시판"
        description="추천을 많이 받은 인기 게시글들을 모아보는 공간입니다."
      />

      <div className="space-y-12">
        {/* Post Detail Content */}
        <PostDetailView post={post} />

        {/* Divider */}
        <hr className="border-zinc-200/80 dark:border-zinc-800/80" />

        {/* Board List Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              인기 게시판의 다른 글
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              추천을 많이 받은 인기 게시글들입니다.
            </p>
          </div>

          {/* Posts List */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
            <BoardDesktopTable
              posts={posts}
              searchParams={currentSearchParams}
              showBoardName={true}
              isBestContext={true}
            />
            <BoardMobileStack
              posts={posts}
              searchParams={currentSearchParams}
              showBoardName={true}
              isBestContext={true}
            />
          </div>

          {/* Pagination & Search */}
          <div className="flex flex-col items-center gap-6 pt-4">
            <BoardPagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              activeFilter="all"
              searchType={searchType}
              searchKeyword={searchKeyword}
              basePath={basePath}
            />
            <BoardSearchArea
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              activeFilter="all"
              searchType={searchType}
              searchKeyword={searchKeyword}
              basePath={basePath}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
