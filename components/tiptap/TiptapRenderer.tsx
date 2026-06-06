"use client";

import React from "react";

export interface TiptapMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface TiptapNode {
  type?: string;
  attrs?: Record<string, unknown>;
  text?: string;
  marks?: TiptapMark[];
  content?: TiptapNode[];
}

interface TiptapRendererProps {
  content: unknown;
}

export const TiptapRenderer: React.FC<TiptapRendererProps> = ({ content }) => {
  if (!content) return null;

  let doc: TiptapNode | null = null;
  if (typeof content === "string") {
    try {
      doc = JSON.parse(content) as TiptapNode;
    } catch {
      // Fallback if content is plain text
      return (
        <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      );
    }
  } else if (typeof content === "object") {
    doc = content as TiptapNode;
  }

  if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) {
    return (
      <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap">
        {String(content)}
      </p>
    );
  }

  const renderMark = (textNode: TiptapNode, children: React.ReactNode, index: number) => {
    if (!textNode.marks || textNode.marks.length === 0) return children;

    let result = children;
    textNode.marks.forEach((mark, markIdx) => {
      const key = `mark-${index}-${markIdx}`;
      switch (mark.type) {
        case "bold":
          result = (
            <strong key={key} className="font-bold text-zinc-900 dark:text-zinc-50">
              {result}
            </strong>
          );
          break;
        case "italic":
          result = (
            <em key={key} className="italic text-zinc-800 dark:text-zinc-200">
              {result}
            </em>
          );
          break;
        case "strike":
          result = (
            <span key={key} className="line-through text-zinc-400 dark:text-zinc-500">
              {result}
            </span>
          );
          break;
        case "underline":
          result = (
            <span key={key} className="underline decoration-zinc-400 dark:decoration-zinc-500">
              {result}
            </span>
          );
          break;
        case "code":
          result = (
            <code key={key} className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-rose-500 dark:text-rose-400 font-mono text-sm">
              {result}
            </code>
          );
          break;
        case "link": {
          const href = typeof mark.attrs?.href === "string" ? mark.attrs.href : "#";
          const target = typeof mark.attrs?.target === "string" ? mark.attrs.target : "_blank";
          result = (
            <a
              key={key}
              href={href}
              target={target}
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline decoration-indigo-400/50 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {result}
            </a>
          );
          break;
        }
        default:
          break;
      }
    });
    return result;
  };

  const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
    const key = `node-${node.type || "unknown"}-${index}`;

    switch (node.type) {
      case "paragraph":
        return (
          <p key={key} className="my-3 text-zinc-800 dark:text-zinc-200 leading-relaxed text-base">
            {node.content ? node.content.map((child, idx) => renderNode(child, idx)) : "\u00A0"}
          </p>
        );
      case "heading": {
        const level = typeof node.attrs?.level === "number" ? node.attrs.level : 1;
        const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
        const classes = {
          1: "text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-6 mb-3",
          2: "text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-5 mb-2",
          3: "text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-2",
        }[level as 1 | 2 | 3] || "text-base font-medium mt-3 mb-2";

        return (
          <Tag key={key} className={classes}>
            {node.content?.map((child, idx) => renderNode(child, idx))}
          </Tag>
        );
      }
      case "bulletList":
        return (
          <ul key={key} className="list-disc pl-6 my-4 space-y-1.5 text-zinc-800 dark:text-zinc-200">
            {node.content?.map((child, idx) => renderNode(child, idx))}
          </ul>
        );
      case "orderedList":
        return (
          <ol key={key} className="list-decimal pl-6 my-4 space-y-1.5 text-zinc-800 dark:text-zinc-200">
            {node.content?.map((child, idx) => renderNode(child, idx))}
          </ol>
        );
      case "listItem":
        return (
          <li key={key}>
            {node.content?.map((child, idx) => renderNode(child, idx))}
          </li>
        );
      case "codeBlock": {
        const codeText = node.content?.map((child) => child.text).join("") || "";
        return (
          <pre key={key} className="p-4 my-4 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/80 font-mono text-sm overflow-x-auto text-zinc-900 dark:text-zinc-100">
            <code>{codeText}</code>
          </pre>
        );
      }
      case "text":
        return renderMark(node, node.text || "", index);
      case "horizontalRule":
        return <hr key={key} className="my-6 border-zinc-200 dark:border-zinc-800" />;
      default:
        return null;
    }
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {doc.content.map((node, idx) => renderNode(node, idx))}
    </div>
  );
};
