import { getPostById, getUserPostVote } from "@/lib/queries/post";
import { getCommentsByPostId } from "@/lib/queries/comment";
import { getSessionUser } from "@/lib/utils/auth";
import PostDetailHeader from "./post-detail-header";
import PostDetailContent from "./post-detail-content";
import PostVote from "./post-vote";
import PostComments from "./post-comments";

interface PostDetailSectionProps {
  postIdPromise: Promise<number>;
}

// 로컬 헬퍼 서브컴포넌트 (게시글 미존재 시 표시) - 파일 상단 배치
const PostNotFoundState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        존재하지 않는 게시글입니다.
      </h2>
    </div>
  );
};

// 메인 컴포넌트 - 파일 최하단 배치
export const PostDetailSection = async ({ postIdPromise }: PostDetailSectionProps) => {
  const postId = await postIdPromise;
  const post = await getPostById(postId);

  if (!post) {
    return <PostNotFoundState />;
  }

  const sessionUser = await getSessionUser();

  // 병렬 데이터 페칭 (Vercel Best Practice: async-parallel)
  const [initialUserVote, comments] = await Promise.all([
    sessionUser ? getUserPostVote(post.id, sessionUser.id) : Promise.resolve(null),
    getCommentsByPostId(post.id),
  ]);

  return (
    <div className="py-3">
      {/* 1. 헤더 메타 영역 */}
      <PostDetailHeader post={post} />

      {/* 2. 본문 영역 */}
      <PostDetailContent content={post.content} />

      {/* 3. 추천/비추천 버튼 영역 */}
      <PostVote
        postId={post.id}
        likes={post.likes}
        dislikes={post.dislikes}
        initialUserVote={initialUserVote}
        isLoggedIn={!!sessionUser}
      />

      {/* 4. 댓글 영역 */}
      <PostComments
        postId={post.id}
        commentsCount={post.comments_count || 0}
        comments={comments}
        currentUserId={sessionUser?.id}
        isLoggedIn={!!sessionUser}
      />
    </div>
  );
};

export default PostDetailSection;
