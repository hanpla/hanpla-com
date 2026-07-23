import type { JSONContent } from "@tiptap/react";

/**
 * Tiptap 에디터의 JSON 본문 구조에서 포함된 모든 이미지 URL들을 추출합니다.
 */
export const getUsedImageUrls = (jsonStr: string): string[] => {
  if (!jsonStr) return [];
  try {
    const json = JSON.parse(jsonStr) as JSONContent;
    const urls: string[] = [];

    const extractNode = (node: JSONContent) => {
      if (node.type === "image" && node.attrs?.src) {
        urls.push(node.attrs.src as string);
      }
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(extractNode);
      }
    };

    extractNode(json);
    return urls;
  } catch {
    return [];
  }
};
