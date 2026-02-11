import Link from "next/link";

// Utils
import { formatDate } from "@/libs/utils/format";

// Icons
import { MessageSquare } from "lucide-react";

// Types
import { PostListType } from "@/libs/types/board";

interface PostProps {
  abbr: string;
  post: PostListType;
  qs: string;
}

export default function PostListItem({ abbr, post, qs }: PostProps) {
  const href = `/board/${abbr}/${post.id}?${qs}`;

  return (
    <PostContainer href={href}>
      <LeftContainer>
        <Title title={post.title} />
        <Info
          nickname={post.nickname}
          time={post.createdAt}
          ip={post.ip}
          isBest={abbr === "best"}
        />
      </LeftContainer>
      <CommentCount count={post.comments} />
    </PostContainer>
  );
}

const PostContainer = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li className="hover:bg-neutral-50">
      <Link
        href={href}
        className="flex items-center justify-between px-2 py-4 gap-4"
      >
        {children}
      </Link>
    </li>
  );
};

const LeftContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-1.5 min-w-0 flex-1">{children}</div>;
};

const Title = ({ title }: { title: string }) => {
  return (
    <h3 className="text-[15px] font-medium text-neutral-800 truncate leading-snug">
      {title}
    </h3>
  );
};

const Info = ({
  nickname,
  time,
  ip,
  isBest,
}: {
  nickname: string;
  time: string;
  ip: string;
  isBest: boolean;
}) => {
  return (
    <div className="flex items-center gap-2 text-[12px] text-neutral-400">
      <span className="font-medium text-neutral-600">{nickname}</span>
      {ip && <span className="opacity-70">({ip})</span>}
      <span className="w-px h-2.5 bg-neutral-200" />
      <span>
        {isBest ? formatDate.relative(time) : formatDate.onlyHour(time)}
      </span>
    </div>
  );
};

const CommentCount = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-600">
      <MessageSquare size={12} className="mt-0.5" />
      <span className="text-[12px] font-bold">{count}</span>
    </div>
  );
};
