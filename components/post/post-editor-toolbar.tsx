/* eslint-disable react-hooks/refs */
"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Editor } from "@tiptap/react";

import { getSignedUploadUrlAction } from "@/lib/actions/image";
import BoldIcon from "@/components/icons/bold-icon";
import ItalicIcon from "@/components/icons/italic-icon";
import StrikeIcon from "@/components/icons/strike-icon";
import CodeIcon from "@/components/icons/code-icon";
import CodeBlockIcon from "@/components/icons/code-block-icon";
import BulletListIcon from "@/components/icons/bullet-list-icon";
import OrderedListIcon from "@/components/icons/ordered-list-icon";
import BlockquoteIcon from "@/components/icons/blockquote-icon";
import ImageIcon from "@/components/icons/image-icon";
import UndoIcon from "@/components/icons/undo-icon";
import RedoIcon from "@/components/icons/redo-icon";

interface PostEditorToolbarProps {
  editor: Editor | null;
  onImageUploaded?: (url: string) => void;
}

const MAX_SINGLE_SIZE = 8 * 1024 * 1024; // 이미지 1개당 최대 8MB
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 글당 전체 이미지 최대 50MB

export const PostEditorToolbar = ({
  editor,
  onImageUploaded,
}: PostEditorToolbarProps) => {
  // 에디터 서식 상태 변화에 따른 툴바 UI 업데이트 트리거
  const [, setUpdateCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 숨김 파일 input 참조 및 이미지 누적 용량(byte) 추적
  const fileInputRef = useRef<HTMLInputElement>(null);
  const totalImageSizeRef = useRef<number>(0);

  useEffect(() => {
    if (!editor) return;

    // 에디터 서식 변경 시에만 리렌더링 갱신
    const handleTransaction = () => {
      setUpdateCount((prev) => prev + 1);
    };

    editor.on("transaction", handleTransaction);
    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  if (!editor) return null;

  const handleImageButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles);

    try {
      setIsUploading(true);

      for (const file of files) {
        // 1. 단일 파일 용량 검증 (8MB)
        if (file.size > MAX_SINGLE_SIZE) {
          alert(`'${file.name}' 파일이 8MB를 초과하여 업로드할 수 없습니다.`);
          continue;
        }

        // 2. 누적 총 용량 검증 (50MB)
        if (totalImageSizeRef.current + file.size > MAX_TOTAL_SIZE) {
          alert(
            `전체 이미지 용량이 50MB를 초과하여 더 이상 이미지를 추가할 수 없습니다. ('${file.name}' 제외됨)`
          );
          break;
        }

        // 3. 서버에 서명된 업로드 URL 발급 요청
        const signedResult = await getSignedUploadUrlAction(
          file.name,
          file.type,
          file.size,
          totalImageSizeRef.current
        );

        if (!signedResult.success || !signedResult.signedUrl || !signedResult.publicUrl) {
          alert(signedResult.error || `'${file.name}' 업로드 권한 생성에 실패했습니다.`);
          continue;
        }

        // 4. 브라우저 Direct Upload 수행
        const uploadResponse = await fetch(signedResult.signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          console.error("Direct upload failed for", file.name, uploadResponse.statusText);
          alert(`'${file.name}' 업로드 중 오류가 발생했습니다.`);
          continue;
        }

        // 5. 성공 시 누적 용량 추가, 상위 추적 콜백 호출 및 커서 다음 라인에 이미지 삽입
        totalImageSizeRef.current += file.size;
        onImageUploaded?.(signedResult.publicUrl);

        editor
          .chain()
          .focus()
          .setImage({ src: signedResult.publicUrl, alt: file.name })
          .createParagraphNear()
          .run();
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("이미지 업로드 처리 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const btnClass = (isActive: boolean) =>
    `p-2 rounded-md transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/80 ${
      isActive
        ? "bg-zinc-200/80 text-zinc-950 dark:bg-zinc-700 dark:text-zinc-50 font-bold"
        : "text-zinc-500 dark:text-zinc-400"
    }`;

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
    { type: "separator" },
    {
      title: isUploading ? "이미지 업로드 중..." : "이미지 첨부",
      isActive: false,
      onClick: handleImageButtonClick,
      disabled: isUploading,
      icon: ImageIcon,
      isUploading,
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
      {/* 숨겨진 파일 선택 Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif, image/webp"
        multiple
        className="hidden"
      />

      {items.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-800"
            />
          );
        }

        const isItemUploading = "isUploading" in item && item.isUploading;

        return (
          <button
            key={item.title}
            type="button"
            onClick={item.onClick}
            disabled={item.disabled}
            className={`${btnClass(item.isActive!)} ${
              item.disabled ? "opacity-40 cursor-not-allowed" : ""
            }`}
            title={item.title}
          >
            {isItemUploading ? (
              <span className="h-4 w-4 block animate-spin rounded-full border-2 border-zinc-400 border-t-transparent" />
            ) : item.icon ? (
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
