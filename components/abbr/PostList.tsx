// Components
import EmptyList from "../common/ui/EmptyUi";
import PostListItem from "./PostListItem";

// Types
import { PostListType } from "@/libs/types/board";

interface Props {
  abbr: string;
  postList: PostListType[];
  qs: string;
}

export default function PostList({ abbr, postList, qs }: Props) {
  if (postList.length === 0) {
    return <EmptyList text={"게시글이 없어요"} height={480} />;
  }

  return (
    <ListContainer>
      {postList.map((post) => (
        <PostListItem key={post.id} post={post} abbr={abbr} qs={qs} />
      ))}
    </ListContainer>
  );
}

const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ul className="flex flex-col divide-y divide-neutral-100 min-h-120">
      {children}
    </ul>
  );
};
