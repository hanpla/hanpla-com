import Link from "next/link";
import parse, { HTMLReactParserOptions, DOMNode, Element, domToReact } from "html-react-parser";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

import { getPostById } from "@/lib/queries/posts";
import EyeIcon from "@/components/icons/eye-icon";
import HeartIcon from "@/components/icons/heart-icon";

interface PostDetailSectionProps {
  postIdPromise: Promise<number>;
}

// DOMNode 타입 체크를 위한 타입 가드
const isElement = (node: DOMNode): node is Element => {
  return node.type === "tag";
};

// html-react-parser 옵션: 내부 링크 a -> Link 변환 규칙
const parserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isElement(domNode) && domNode.name === "a" && domNode.attribs.href) {
      const href = domNode.attribs.href;
      const isInternal = href.startsWith("/") || href.startsWith(".") || !href.includes("://");

      if (isInternal) {
        return (
          <Link href={href} className={domNode.attribs.class}>
            {domToReact(domNode.children as DOMNode[], parserOptions)}
          </Link>
        );
      }
    }
  },
};

const PostDetailSection = async ({ postIdPromise }: PostDetailSectionProps) => {
  const postId = await postIdPromise;
  const post = await getPostById(postId);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          존재하지 않는 게시글입니다.
        </h2>
      </div>
    );
  }

  const author = post.users?.nickname || "익명";

  // Tiptap JSON -> HTML 변환 (보안 위협 자동 정제)
  let contentHtml = "";
  if (post.content) {
    try {
      const rawJson = typeof post.content === "string" ? JSON.parse(post.content) : post.content;
      contentHtml = generateHTML(rawJson, [StarterKit]);
    } catch (e) {
      console.error(e);
      if (typeof post.content === "string") {
        contentHtml = post.content;
      }
    }
  }

  return (
    <div className="space-y-6 py-6">
      {/* 헤더 메타 영역 */}
      <div className="space-y-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{author}</span>
            <span>•</span>
            <span title={new Date(post.created_at).toLocaleString()}>
              {post.formattedTime || post.created_at.split("T")[0]}
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

      {/* Tiptap 글 본문 영역 (Tailwind Typography prose 적용) */}
      <div className="prose dark:prose-invert min-h-50 max-w-none py-4 leading-relaxed">
        {contentHtml ? (
          parse(contentHtml, parserOptions)
        ) : (
          <p className="text-zinc-400 dark:text-zinc-500">본문 내용이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default PostDetailSection;
