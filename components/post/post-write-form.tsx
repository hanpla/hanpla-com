"use client";

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { createPostAction, FormActionState } from "@/lib/actions/post";
import { useMount } from "@/hooks/use-mount";
import Button from "@/components/ui/button";
import InputField from "@/components/ui/input-field";
import PostWriteFormSkeleton from "./post-write-form-skeleton";
import PostEditorToolbar from "./post-editor-toolbar";

interface PostWriteFormProps {
  boardAbbr: string;
}

export const PostWriteForm = ({ boardAbbr }: PostWriteFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [contentStr, setContentStr] = useState("");

  // 공통 커스텀 훅 useMount를 활용한 하이드레이션 클라이언트 가드
  const isClient = useMount();

  // React 19의 useActionState에 서버 액션(createPostAction)을 직접 전달
  const [state, formAction, isPending] = useActionState(createPostAction, {
    success: false,
  } as FormActionState);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false, // Next.js SSR 하이드레이션 오류 방지를 위해 명시적으로 설정
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100",
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      // 비어있는지 사전 체크하여 hidden input 값 갱신
      const hasText = json.content?.some(
        (node: JSONContent) => node.content && node.content.length > 0
      );
      setContentStr(hasText ? JSON.stringify(json) : "");
    },
  });

  // 등록 완료 시 상세 페이지로 리다이렉트 (복수형 /boards/ 적용)
  useEffect(() => {
    if (state.success && state.postId) {
      router.push(`/boards/${boardAbbr}/${state.postId}`);
    }
  }, [state, boardAbbr, router]);

  if (!isClient || !editor) {
    return <PostWriteFormSkeleton />;
  }

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* 서버 액션으로 전송할 게시판 정보 hidden input */}
      <input type="hidden" name="boardAbbr" value={boardAbbr} />

      {/* 본문 에디터 내용 바인딩용 hidden input */}
      <input type="hidden" name="content" value={contentStr} />

      {/* 에러 피드백 */}
      {state.error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800 dark:bg-red-950/30 dark:text-red-400">
          {state.error}
        </div>
      )}

      {/* 제목 입력창 */}
      <InputField
        label="제목"
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        maxLength={100}
        required
        error={state.error && state.error.includes("제목") ? state.error : undefined}
      />

      {/* 에디터 래퍼 */}
      <div className="flex w-full flex-col gap-1.5">
        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">본문</span>
        <div className="rounded-lg border border-zinc-200 bg-transparent transition-all duration-200 focus-within:border-zinc-950 focus-within:ring-2 focus-within:ring-zinc-950/10 focus-within:outline-hidden dark:border-zinc-800/80 dark:focus-within:border-zinc-100 dark:focus-within:ring-zinc-100/10">
          {/* 툴바 컴포넌트 연동 */}
          <PostEditorToolbar editor={editor} />

          {/* 에디터 본문 */}
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* 버튼들 */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isPending}>
          취소
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isPending ? "등록 중..." : "등록"}
        </Button>
      </div>
    </form>
  );
};

export default PostWriteForm;
