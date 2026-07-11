"use client";

import { useState, useEffect, useRef } from "react";
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
  // 에디터의 세부 상태 변화(선택 영역, 커서 이동, 서식 토글 등)를 실시간 반영하기 위한 강제 리렌더러
  const [, setUpdateCount] = useState(0);

  // 이전 버튼들의 활성화 상태를 메모리에 기록하기 위한 ref (타이핑 시 불필요한 렌더링 방어)
  const prevStatesRef = useRef<string>("");

  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      // 현재 버튼들의 활성 상태를 수집하여 문자열로 조합
      const currentStates = [
        editor.isActive("bold"),
        editor.isActive("italic"),
        editor.isActive("strike"),
        editor.isActive("heading", { level: 1 }),
        editor.isActive("heading", { level: 2 }),
        editor.isActive("heading", { level: 3 }),
        editor.isActive("code"),
        editor.isActive("codeBlock"),
        editor.isActive("blockquote"),
        editor.isActive("bulletList"),
        editor.isActive("orderedList"),
        editor.can().undo(),
        editor.can().redo(),
      ].join(",");

      // 활성화된 서식 상태에 변화가 발생한 경우에만 컴포넌트 리렌더링 격발
      if (prevStatesRef.current !== currentStates) {
        prevStatesRef.current = currentStates;
        setUpdateCount((prev) => prev + 1);
      }
    };

    editor.on("transaction", handleTransaction);
    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  if (!editor) return null;

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 ${
      isActive
        ? "bg-zinc-200/80 text-zinc-950 dark:bg-zinc-700 dark:text-zinc-50 font-bold"
        : "text-zinc-500 dark:text-zinc-400"
    }`;

  // 반복되는 마크업 제거를 위해 에디터 상태 및 액션 객체화
  const items = [
    {
      title: "굵게",
      isActive: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      title: "기울임",
      isActive: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      title: "취소선",
      isActive: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikeIcon,
    },
    { type: "separator" },
    {
      title: "제목 1 (H1)",
      isActive: editor.isActive("heading", { level: 1 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      label: "H1",
    },
    {
      title: "제목 2 (H2)",
      isActive: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      label: "H2",
    },
    {
      title: "제목 3 (H3)",
      isActive: editor.isActive("heading", { level: 3 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      label: "H3",
    },
    { type: "separator" },
    {
      title: "인라인 코드",
      isActive: editor.isActive("code"),
      onClick: () => editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
    {
      title: "코드 블록",
      isActive: editor.isActive("codeBlock"),
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      icon: CodeBlockIcon,
    },
    {
      title: "인용구",
      isActive: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      icon: BlockquoteIcon,
    },
    { type: "separator" },
    {
      title: "순서 없는 목록",
      isActive: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      icon: BulletListIcon,
    },
    {
      title: "순서 있는 목록",
      isActive: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      icon: OrderedListIcon,
    },
  ];

  const undoRedoItems = [
    {
      title: "되돌리기",
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().undo(),
      icon: UndoIcon,
    },
    {
      title: "다시 실행",
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().redo(),
      icon: RedoIcon,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-zinc-200 p-2 dark:border-zinc-800/80">
      {items.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800"
            />
          );
        }

        return (
          <button
            key={item.title}
            type="button"
            onClick={item.onClick}
            className={btnClass(item.isActive!)}
            title={item.title}
          >
            {item.icon ? (
              <item.icon className="h-4 w-4" />
            ) : (
              <span className="text-[11px] font-extrabold tracking-tighter leading-none select-none font-sans">
                {item.label}
              </span>
            )}
          </button>
        );
      })}

      {/* 순수한 구분선 */}
      <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

      {/* 모바일 화면에서만 동작하는 줄바꿈용 가변 여백 */}
      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-1 sm:ml-auto">
        {undoRedoItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
              title={item.title}
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PostEditorToolbar;
