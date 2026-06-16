import { getPostById, getPostsByBoardAbbr } from "@/lib/queries/posts";
import PostDetailView from "@/components/post/PostDetailView";
import BoardDesktopTable from "@/components/board/BoardDesktopTable";
import BoardMobileStack from "@/components/board/BoardMobileStack";
import BoardButtonGroup from "@/components/board/BoardButtonGroup";
import BoardPagination from "@/components/board/BoardPagination";
import BoardSearchArea from "@/components/board/BoardSearchArea";
import BoardHeader from "@/components/board/BoardHeader";
import RecordVisit from "@/components/layout/RecordVisit";
import { notFound } from "next/navigation";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

export type PostPageParams = Promise<{
  abbr: string;
  id: string;
}>;

export type PostPageSearchParams = Promise<{
  filter?: string;
  page?: string;
  searchType?: string;
  searchKeyword?: string;
}>;

export interface PostPageProps {
  params: PostPageParams;
  searchParams: PostPageSearchParams;
}

export const generateMetadata = async ({ params }: PostPageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    return { title: "게시글 - hanpla-com" };
  }

  const post = await getPostById(postId);

  return {
    title: post ? `${post.title} - hanpla-com` : "게시글 - hanpla-com",
    description: post ? `${post.title} 본문 내용을 확인해 보세요.` : undefined,
  };
}

import { Suspense } from "react";
import { PostDetailSkeleton } from "@/components/ui/Skeletons";

export default function PostPage({ params, searchParams }: PostPageProps) {
  return (
    <Suspense fallback={<div className="wrapper py-8"><PostDetailSkeleton /></div>}>
      <PostPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function PostPageContent({
  params,
  searchParams,
}: {
  params: PostPageParams;
  searchParams: PostPageSearchParams;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { abbr, id } = resolvedParams;
  const { filter, page, searchType, searchKeyword } = resolvedSearchParams;

  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    notFound();
  }

  const currentPage = parseInt(page || "1", 10) || 1;
  const pageSize = DEFAULT_PAGE_SIZE;

  // Fetch post detail and posts list under the current board in parallel
  const [post, { posts, totalCount }] = await Promise.all([
    getPostById(postId),
    getPostsByBoardAbbr(abbr, filter, currentPage, pageSize, searchType, searchKeyword),
  ]);

  if (!post || !post.boards || post.board_abbr !== abbr) {
    notFound();
  }

  const activeFilter = filter === "popular" ? "popular" : "all";
  const basePath = `/board/${abbr}/${id}`;
  const currentSearchParams = {
    filter,
    page,
    searchType,
    searchKeyword,
  };

  return (
    <div className="wrapper space-y-6 py-8">
      {/* Header */}
      <BoardHeader board={post.boards} />

      <div className="space-y-12">
      {/* Post Detail Content */}
      <PostDetailView post={post} />

      {/* Divider */}
      <hr className="border-zinc-200/80 dark:border-zinc-800/80" />

      {/* Board List Section */}
      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            이 게시판의 다른 글
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {post.boards.name} 게시판의 최신 게시글 목록입니다.
          </p>
        </div>

        {/* Posts List */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/30">
          <BoardDesktopTable posts={posts} searchParams={currentSearchParams} />
          <BoardMobileStack posts={posts} searchParams={currentSearchParams} />
        </div>

        {/* Button Group (All, Popular, Write) */}
        <BoardButtonGroup boardAbbr={abbr} activeFilter={activeFilter} />

        {/* Pagination & Search */}
        <div className="flex flex-col items-center gap-6 pt-4">
          <BoardPagination
            boardAbbr={abbr}
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            activeFilter={activeFilter}
            searchType={searchType}
            searchKeyword={searchKeyword}
            basePath={basePath}
          />
          <BoardSearchArea
            boardAbbr={abbr}
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            activeFilter={activeFilter}
            searchType={searchType}
            searchKeyword={searchKeyword}
            basePath={basePath}
          />
        </div>
      </div>
      </div>
      <RecordVisit board={post.boards} />
    </div>
  );
}
