"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function SimpleEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>여기에 내용을 입력하며 연습해보세요! ✍️</p>",
    immediatelyRender: false,
    // 에디터의 스타일을 잡기 위해 editorProps를 사용합니다.
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose-base outline-none min-h-[200px] p-4",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
      {/* 툴바 영역 (연습용으로 간단하게) */}
      <div className="flex gap-2 p-2 border-b border-neutral-100 bg-neutral-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive("bold") ? "bg-neutral-800 text-white" : "bg-white border"}`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive("italic") ? "bg-neutral-800 text-white" : "bg-white border"}`}
        >
          Italic
        </button>
      </div>

      {/* 실제 에디터 입력창 */}
      <EditorContent editor={editor} />

      {/* 데이터 확인용 (JSON) */}
      <div className="p-4 bg-neutral-900 text-white text-xs font-mono">
        <p className="mb-2 text-neutral-400">// Current JSON Output:</p>
        <pre>{JSON.stringify(editor.getJSON(), null, 2)}</pre>
      </div>
    </div>
  );
}
