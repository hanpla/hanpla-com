import { getPostById } from "@/lib/queries/posts";
import PostDetailView from "@/components/post/PostDetailView";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    abbr: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = await params;
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
  const { id } = await params;
  const postId = parseInt(id, 10);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return <PostDetailView post={post} />;
}
