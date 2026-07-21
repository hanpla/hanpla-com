import EyeIcon from "@/components/icons/eye-icon";
import HeartIcon from "@/components/icons/heart-icon";
import { formatDate } from "@/lib/utils/date";
import type { PostWithRelations } from "@/types/post";

interface PostDetailHeaderProps {
  post: PostWithRelations;
}

export const PostDetailHeader = ({ post }: PostDetailHeaderProps) => {
  const author = post.author?.nickname || "익명";

  return (
    <div className="space-y-2 border-y border-zinc-200 py-3 dark:border-zinc-800">
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
        {post.title}
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{author}</span>
          <span>•</span>
          <span title={new Date(post.created_at).toLocaleString()}>
            {formatDate(post.created_at)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <EyeIcon className="h-4 w-4" />
            조회 {post.views}
          </span>
          <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
            <HeartIcon className="h-4 w-4" />
            추천 {post.likes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailHeader;
