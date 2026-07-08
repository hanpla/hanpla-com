import { useState } from "react";
import { useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Tiptap 에디터를 초기화하고 본문 내용 상태(JSON 문자열)를 추적하는 커스텀 훅입니다.
 * - 글 쓰기(Write) 및 글 수정(Edit) 페이지에서 동일한 에디터 설정 및 스타일을 공유합니다.
 * - 하이드레이션 오류 방지를 위해 immediatelyRender: false를 일괄 적용합니다.
 */
export const usePostEditor = (initialContent = "") => {
  const [contentStr, setContentStr] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    immediatelyRender: false, // Next.js SSR 하이드레이션 오류 방지
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100",
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      // 에디터 본문이 실질적으로 비어있는지 검사
      const hasText = json.content?.some(
        (node: JSONContent) => node.content && node.content.length > 0
      );
      setContentStr(hasText ? JSON.stringify(json) : "");
    },
  });

  return {
    editor,
    contentStr,
    setContentStr,
  };
};

export default usePostEditor;
