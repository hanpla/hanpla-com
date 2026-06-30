"use server";

import { updateTag } from "next/cache";

import { getSessionUser } from "@/lib/utils/auth";
import { createClient } from "@/lib/supabase/client";

export interface FormActionState {
  success: boolean;
  error?: string;
  postId?: number;
}

interface TiptapNode {
  type?: string;
  content?: TiptapNode[];
  text?: string;
}

/**
 * 새로운 게시글을 작성하는 서버 액션입니다.
 * React 19의 useActionState 폼 액션 사양(prevState, formData)을 준수합니다.
 */
export const createPostAction = async (
  prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> => {
  try {
    // 1. 사용자 세션 검증 (서버 단 이중 검증)
    const user = await getSessionUser();
    if (!user) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    // 2. FormData 파싱 및 검증
    const boardAbbr = formData.get("boardAbbr") as string;
    const title = formData.get("title") as string;
    const contentStr = formData.get("content") as string;

    if (!boardAbbr || !boardAbbr.trim()) {
      return { success: false, error: "게시판 정보가 누락되었습니다." };
    }

    if (!title || !title.trim()) {
      return { success: false, error: "제목을 입력해주세요." };
    }

    if (!contentStr) {
      return { success: false, error: "본문 내용을 입력해주세요." };
    }

    let jsonContent;
    try {
      jsonContent = JSON.parse(contentStr);
    } catch {
      return { success: false, error: "본문 데이터 형식(JSON)이 올바르지 않습니다." };
    }

    // Tiptap 비어있는지 검사 (doc 내부에 빈 문단만 있는 경우)
    const hasContent = jsonContent.content?.some(
      (node: TiptapNode) => node.content && node.content.length > 0
    );

    if (!hasContent) {
      return { success: false, error: "본문 내용을 입력해주세요." };
    }

    // 3. Supabase DB 인서트
    const supabase = createClient();
    const { data, error } = await supabase
      .from("posts")
      .insert({
        board_abbr: boardAbbr,
        title: title.trim(),
        content: jsonContent,
        author_id: user.id,
        views: 0,
        likes: 0,
        dislikes: 0,
        comments_count: 0,
      })
      .select("id")
      .single();

    if (error || !data) {
      console.error("Error inserting new post:", error);
      return { success: false, error: "게시글 작성에 실패했습니다." };
    }

    // 4. 캐시 무효화 (해당 게시판의 글 목록 캐시 만료)
    updateTag(`posts-${boardAbbr}`);

    return {
      success: true,
      postId: data.id,
    };
  } catch (err) {
    console.error("Unexpected error in createPostAction:", err);
    return { success: false, error: "알 수 없는 오류가 발생했습니다." };
  }
};
