export interface TiptapNode {
  type?: string;
  text?: string;
  content?: TiptapNode[];
}

/**
 * Recursively extracts plain text from a Tiptap JSON document structure.
 */
export const extractTextFromTiptap = (json: unknown): string => {
  if (!json) return "";
  
  let parsedJson: unknown = json;
  if (typeof json === "string") {
    try {
      parsedJson = JSON.parse(json);
    } catch {
      return json;
    }
  }

  let text = "";

  const traverse = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    const tiptapNode = node as TiptapNode;
    
    if (tiptapNode.type === "text" && typeof tiptapNode.text === "string") {
      text += tiptapNode.text;
    }
    if (Array.isArray(tiptapNode.content)) {
      tiptapNode.content.forEach(traverse);
    }
  };

  traverse(parsedJson);
  return text.trim();
};
