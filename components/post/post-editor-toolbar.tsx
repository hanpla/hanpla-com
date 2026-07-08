"use client";

import { Editor } from "@tiptap/react";
import BoldIcon from "@/components/icons/bold-icon";
import ItalicIcon from "@/components/icons/italic-icon";
import StrikeIcon from "@/components/icons/strike-icon";
import CodeIcon from "@/components/icons/code-icon";
import CodeBlockIcon from "@/components/icons/code-block-icon";
import BulletListIcon from "@/components/icons/bullet-list-icon";
import OrderedListIcon from "@/components/icons/ordered-list-icon";
import BlockquoteIcon from "@/components/icons/blockquote-icon";
import UndoIcon from "@/components/icons/undo-icon";
import RedoIcon from "@/components/icons/redo-icon";

interface PostEditorToolbarProps {
  editor: Editor | null;
}

export const PostEditorToolbar = ({ editor }: PostEditorToolbarProps) => {
  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 ${
      isActive
        ? "bg-zinc-150 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 font-bold"
        : "text-zinc-500 dark:text-zinc-400"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800/80">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass(editor.isActive("bold"))}
        title="굵게"
      >
        <BoldIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass(editor.isActive("italic"))}
        title="기울임"
      >
        <ItalicIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btnClass(editor.isActive("strike"))}
        title="취소선"
      >
        <StrikeIcon className="h-4 w-4" />
      </button>

      <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={btnClass(editor.isActive("code"))}
        title="인라인 코드"
      >
        <CodeIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btnClass(editor.isActive("codeBlock"))}
        title="코드 블록"
      >
        <CodeBlockIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btnClass(editor.isActive("blockquote"))}
        title="인용구"
      >
        <BlockquoteIcon className="h-4 w-4" />
      </button>

      <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass(editor.isActive("bulletList"))}
        title="순서 없는 목록"
      >
        <BulletListIcon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btnClass(editor.isActive("orderedList"))}
        title="순서 있는 목록"
      >
        <OrderedListIcon className="h-4 w-4" />
      </button>

      <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800 mx-1 flex-1 sm:flex-none" />

      <div className="flex items-center gap-1 sm:ml-auto">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
          title="되돌리기"
        >
          <UndoIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
          title="다시 실행"
        >
          <RedoIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PostEditorToolbar;
