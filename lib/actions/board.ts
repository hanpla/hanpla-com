"use server";

import { updateTag } from "next/cache";

/**
 * 게시판 목록 캐시를 즉시 만료시킵니다.
 * 이 함수는 Server Action 내에서만 호출 가능합니다.
 * 게시판 생성, 수정, 삭제 등의 작업 직후 호출하여 사용자가 즉시 최신 정보를 확인하도록 합니다.
 */
export const revalidateBoardsCache = async () => {
  updateTag("boards");
};

