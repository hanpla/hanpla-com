import Link from "next/link";
import parse, { HTMLReactParserOptions, DOMNode, Element, domToReact } from "html-react-parser";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import filterXSS, { getDefaultWhiteList } from "xss";

interface PostDetailContentProps {
  content?: unknown;
}

const isElement = (node: DOMNode): node is Element => {
  return node.type === "tag";
};

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

// XSS Sanitization 허용 목록 설정 (img 태그 및 클래스 속성 보존)
const xssOptions = {
  whiteList: {
    ...getDefaultWhiteList(),
    img: ["src", "alt", "title", "width", "height", "class", "style"],
  },
};

export const PostDetailContent = ({ content }: PostDetailContentProps) => {
  let contentHtml = "";
  if (content) {
    try {
      const rawJson = typeof content === "string" ? JSON.parse(content) : content;
      contentHtml = generateHTML(rawJson, [
        StarterKit,
        Image.configure({
          HTMLAttributes: {
            class: "rounded-lg max-w-full h-auto my-4 mx-auto block shadow-xs",
          },
        }),
      ]);
    } catch (e) {
      console.error("Tiptap JSON parsing failed:", e);
      if (typeof content === "string") {
        contentHtml = content;
      }
    }
  }

  const sanitizedHtml = contentHtml ? filterXSS(contentHtml, xssOptions) : "";

  return (
    <div className="prose dark:prose-invert prose-p:my-1 prose-headings:mt-3 prose-headings:mb-1.5 min-h-50 max-w-none pt-2 pb-6 leading-relaxed">
      {sanitizedHtml ? (
        parse(sanitizedHtml, parserOptions)
      ) : (
        <p className="text-zinc-400 dark:text-zinc-500">본문 내용이 없습니다.</p>
      )}
    </div>
  );
};

export default PostDetailContent;
