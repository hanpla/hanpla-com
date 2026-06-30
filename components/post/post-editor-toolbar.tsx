"use client";

import { Editor } from "@tiptap/react";

import BoldIcon from "@/components/icons/bold-icon";
import ItalicIcon from "@/components/icons/italic-icon";
import StrikeIcon from "@/components/icons/strike-icon";
import CodeIcon from "@/components/icons/code-icon";
import BulletListIcon from "@/components/icons/bullet-list-icon";
import OrderedListIcon from "@/components/icons/ordered-list-icon";
import BlockquoteIcon from "@/components/icons/blockquote-icon";
import CodeBlockIcon from "@/components/icons/code-block-icon";
import UndoIcon from "@/components/icons/undo-icon";
import RedoIcon from "@/components/icons/redo-icon";

interface PostEditorToolbarProps {
  editor: Editor;
}

// 로컬 소규모 JSX 엘리먼트 헬퍼 (H1~H3 라벨 분리 통합 컴포넌트)
const HeadingLabel = ({ level }: { level: 1 | 2 | 3 }) => (
  <span className="text-[10px] font-extrabold tracking-tighter select-none">H{level}</span>
);

export const PostEditorToolbar = ({ editor }: PostEditorToolbarProps) => {
  const getBtnClass = (active: boolean) =>
    `p-2 rounded transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 cursor-pointer ${
      active
        ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
        : "text-zinc-500 dark:text-zinc-400"
    }`;

  return (
    <div className="flex flex-wrap gap-0.5 border-b border-zinc-200 bg-zinc-50/50 p-1.5 dark:border-zinc-800 dark:bg-zinc-900/30">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={getBtnClass(editor.isActive("bold"))}
        title="굵게"
      >
        <BoldIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={getBtnClass(editor.isActive("italic"))}
        title="기울임"
      >
        <ItalicIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={getBtnClass(editor.isActive("strike"))}
        title="취소선"
      >
        <StrikeIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={getBtnClass(editor.isActive("code"))}
        title="인라인 코드"
      >
        <CodeIcon className="h-4 w-4" />
      </button>

      <div className="mx-1 h-6 w-px self-center bg-zinc-200 dark:bg-zinc-800" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={getBtnClass(editor.isActive("heading", { level: 1 }))}
        title="제목 1"
      >
        <HeadingLabel level={1} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={getBtnClass(editor.isActive("heading", { level: 2 }))}
        title="제목 2"
      >
        <HeadingLabel level={2} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={getBtnClass(editor.isActive("heading", { level: 3 }))}
        title="제목 3"
      >
        <HeadingLabel level={3} />
      </button>

      <div className="mx-1 h-6 w-px self-center bg-zinc-200 dark:bg-zinc-800" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={getBtnClass(editor.isActive("bulletList"))}
        title="글머리 기호 목록"
      >
        <BulletListIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={getBtnClass(editor.isActive("orderedList"))}
        title="번호 매기기 목록"
      >
        <OrderedListIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={getBtnClass(editor.isActive("blockquote"))}
        title="인용구"
      >
        <BlockquoteIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={getBtnClass(editor.isActive("codeBlock"))}
        title="코드 블록"
      >
        <CodeBlockIcon className="h-4 w-4" />
      </button>

      <div className="mx-1 h-6 w-px self-center bg-zinc-200 dark:bg-zinc-800" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={getBtnClass(false)}
        disabled={!editor.can().undo()}
        title="실행 취소"
      >
        <UndoIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={getBtnClass(false)}
        disabled={!editor.can().redo()}
        title="다시 실행"
      >
        <RedoIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PostEditorToolbar;
