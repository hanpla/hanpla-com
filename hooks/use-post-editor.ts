import { useState, useRef, useCallback } from "react";
import { useEditor, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import { deletePostImagesAction } from "@/lib/actions/image";
import { getUsedImageUrls } from "@/lib/utils/editor";

/**
 * Tiptap 에디터를 초기화하고 본문 내용 상태(JSON 문자열)를 추적하는 커스텀 훅입니다.
 * - 업로드된 이미지 추적 및 작성 중 삭제된 미사용 이미지 자동 정리 기능을 포함합니다.
 * - 하이드레이션 오류 방지를 위해 immediatelyRender: false를 적용합니다.
 */
export const usePostEditor = (initialContent = "") => {
  const [contentStr, setContentStr] = useState(initialContent);

  // 현재 글 작성 세션에서 업로드된 이미지 URL 목록 기록
  const uploadedImagesRef = useRef<Set<string>>(new Set());

  // 이미지 업로드 성공 시 호출하여 목록에 등록
  const addUploadedImage = useCallback((url: string) => {
    uploadedImagesRef.current.add(url);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4 mx-auto block shadow-xs",
        },
      }),
    ],
    content: initialContent,
    immediatelyRender: false, // Next.js SSR 하이드레이션 오류 방지
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none text-zinc-900 dark:text-zinc-100",
      },
    },
    onUpdate({ editor }) {
      const json = editor.getJSON();
      // 에디터 본문에 텍스트가 있거나 이미지 노드가 존재하는지 검사
      const hasContent = json.content?.some(
        (node: JSONContent) =>
          (node.content && node.content.length > 0) || node.type === "image"
      );
      setContentStr(hasContent ? JSON.stringify(json) : "");
    },
  });

  // 본문에서 삭제된(미사용) 쓰레기 이미지 자동 정리
  const cleanupUnusedImages = useCallback(async (currentJsonStr: string) => {
    const allUploaded = Array.from(uploadedImagesRef.current);
    if (allUploaded.length === 0) return;

    const usedUrls = getUsedImageUrls(currentJsonStr);
    const unusedUrls = allUploaded.filter((url) => !usedUrls.includes(url));

    if (unusedUrls.length > 0) {
      await deletePostImagesAction(unusedUrls);
    }
  }, []);

  // 작성 취소 시 이번 세션에서 업로드되었던 모든 이미지 삭제
  const cleanupAllImages = useCallback(async () => {
    const allUploaded = Array.from(uploadedImagesRef.current);
    if (allUploaded.length > 0) {
      await deletePostImagesAction(allUploaded);
    }
  }, []);

  return {
    editor,
    contentStr,
    setContentStr,
    addUploadedImage,
    cleanupUnusedImages,
    cleanupAllImages,
  };
};

export default usePostEditor;
