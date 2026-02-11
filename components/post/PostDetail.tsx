// Utils
import { formatDate } from "@/libs/utils/format";

// Types
import { PostDetailDataType } from "@/libs/types/post";

interface Props {
  postDetailData: PostDetailDataType;
}

export default function PostDetail({ postDetailData }: Props) {
  return (
    <>
      <Title data={postDetailData} />
      <Info data={postDetailData} />
      <Content />
      <Btns data={postDetailData} />
    </>
  );
}

const Title = ({ data }: { data: PostDetailDataType }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end border-y border-neutral-200 py-2">
      <h1 className="text-xl font-bold text-neutral-800 leading-tight">
        {data.title}
      </h1>
      <span className="text-sm text-neutral-400 whitespace-nowrap">
        {formatDate.full(data.created_at)}
      </span>
    </div>
  );
};

const Info = ({ data }: { data: PostDetailDataType }) => {
  return (
    <div className="flex justify-between items-center text-sm py-2 border-b border-neutral-200 px-1">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-700">{data.nickname}</span>
        {!data.is_login && <span>({data.user_ip})</span>}
      </div>
      <div className="flex gap-4 text-neutral-500">
        <span className="flex gap-1">
          조회 <b className="text-neutral-900">{data.views}</b>
        </span>
        <span className="flex gap-1">
          추천 <b className="text-neutral-900">{data.likes}</b>
        </span>
        <span className="flex gap-1">
          댓글 <b className="text-neutral-900">{data.comments}</b>
        </span>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="text-neutral-800 leading-relaxed min-h-75 text-md py-4">
      <p>
        이곳에 게시글 본문 내용이 들어갑니다. Tailwind의 leading-relaxed를
        사용하면 가독성이 훨씬 좋아집니다. 긴 글도 편안하게 읽을 수 있도록
        자간과 행간을 조절했습니다.
      </p>
    </div>
  );
};

const Btns = ({ data }: { data: PostDetailDataType }) => {
  return (
    <div className="flex justify-center gap-3 mt-12">
      <button className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 border-blue-50 text-blue-600 hover:bg-blue-50 transition-colors group">
        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
          👍
        </span>
        <span className="text-xs font-bold">{data.likes}</span>
      </button>
      <button className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 border-red-50 text-red-600 hover:bg-red-50 transition-colors group">
        <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
          👎
        </span>
        <span className="text-xs font-bold">{data.dislikes}</span>
      </button>
    </div>
  );
};
