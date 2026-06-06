import { getPostById } from "@/lib/queries/posts";
import PostDetailView from "@/components/post/PostDetailView";
import { notFound } from "next/navigation";

export type PostPageParams = Promise<{
  abbr: string;
  id: string;
}>;

export interface PostPageProps {
  params: PostPageParams;
}

export async function generateMetadata({ params }: PostPageProps) {
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

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const { abbr, id } = resolvedParams;
  const postId = parseInt(id, 10);


  if (isNaN(postId)) {
    notFound();
  }

  // Fetch post which already contains the joined boards details
  const post = await getPostById(postId);

  if (!post || !post.boards || post.board_abbr !== abbr) {
    notFound();
  }

  return <PostDetailView post={post} />;
}
