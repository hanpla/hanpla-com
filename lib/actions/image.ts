"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SignedUrlResult } from "@/types/image";

const MAX_SINGLE_FILE_SIZE = 8 * 1024 * 1024; // 단일 파일 최대 8MB
const MAX_TOTAL_IMAGES_SIZE = 50 * 1024 * 1024; // 글 1개당 전체 파일 최대 50MB

/**
 * 클라이언트에서 Supabase Storage에 직접 이미지(Direct Upload)를 올릴 수 있도록
 * 세션 검증 후 서명된 업로드 URL(Signed Upload URL)과 Public URL을 생성하여 반환합니다.
 */
export const getSignedUploadUrlAction = async (
  fileName: string,
  fileType: string,
  fileSize: number,
  currentTotalSize: number = 0
): Promise<SignedUrlResult> => {
  try {
    // 1. 사용자 세션 및 JWT 검증
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is missing");
    }

    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jose.jwtVerify(token, secret);
      if (!payload.id) {
        throw new Error("Missing user id in token payload");
      }
    } catch (err) {
      console.error("JWT verification failed in getSignedUploadUrlAction:", err);
      return {
        success: false,
        error: "유효하지 않거나 만료된 세션입니다. 다시 로그인해 주세요.",
      };
    }

    // 2. 파일 타입 및 단일 용량 사전 검증 (최대 8MB)
    if (!fileType.startsWith("image/")) {
      return { success: false, error: "이미지 파일만 업로드할 수 있습니다." };
    }

    if (fileSize > MAX_SINGLE_FILE_SIZE) {
      return {
        success: false,
        error: "이미지 1개당 용량은 최대 8MB를 초과할 수 없습니다.",
      };
    }

    // 3. 전체 누적 용량 검증 (최대 50MB)
    if (currentTotalSize + fileSize > MAX_TOTAL_IMAGES_SIZE) {
      return {
        success: false,
        error: "한 게시글당 첨부할 수 있는 전체 이미지 용량은 최대 50MB를 초과할 수 없습니다.",
      };
    }

    // 4. 고유 파일 경로 생성
    const fileExt = fileName.split(".").pop() || "png";
    const timeStamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 9);
    const filePath = `posts/${timeStamp}_${randomStr}.${fileExt}`;

    // 5. Supabase Storage 서명된 업로드 URL 생성 (2분간 유효)
    const supabase = createAdminClient();
    const { data: signedData, error: signedError } = await supabase.storage
      .from("post-images")
      .createSignedUploadUrl(filePath);

    if (signedError || !signedData) {
      console.error("Failed to create signed upload url:", signedError);
      return {
        success: false,
        error: "업로드 권한 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      };
    }

    // 6. 최종 조회용 Public URL 추출
    const { data: publicUrlData } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return {
      success: true,
      signedUrl: signedData.signedUrl,
      token: signedData.token,
      path: signedData.path,
      publicUrl: publicUrlData.publicUrl,
    };
  } catch (error) {
    console.error("Unexpected error in getSignedUploadUrlAction:", error);
    return {
      success: false,
      error: "업로드 준비 중 알 수 없는 오류가 발생했습니다.",
    };
  }
};

/**
 * Supabase Storage에서 더 이상 사용되지 않거나 지워진 이미지 파일들을 일괄 삭제합니다.
 */
export const deletePostImagesAction = async (
  imageUrls: string[]
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!imageUrls || imageUrls.length === 0) {
      return { success: true };
    }

    // 1. 사용자 세션 및 JWT 검증
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) {
      return { success: false, error: "로그인이 필요합니다." };
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is missing");
    }

    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jose.jwtVerify(token, secret);
      if (!payload.id) {
        throw new Error("Missing user id in token payload");
      }
    } catch (err) {
      console.error("JWT verification failed in deletePostImagesAction:", err);
      return { success: false, error: "유효하지 않거나 만료된 세션입니다." };
    }

    // 2. Public URL에서 상대 파일 경로(posts/xxx.png) 추출
    const filePaths = imageUrls
      .map((url) => {
        const match = url.match(/post-images\/(.+)$/);
        return match ? match[1] : null;
      })
      .filter((path): path is string => path !== null);

    if (filePaths.length === 0) {
      return { success: true };
    }

    // 3. Supabase Storage 미사용 이미지 일괄 삭제
    const supabase = createAdminClient();
    const { error: removeError } = await supabase.storage
      .from("post-images")
      .remove(filePaths);

    if (removeError) {
      console.error("Failed to remove unused images from storage:", removeError);
      return { success: false, error: "미사용 이미지 삭제에 실패했습니다." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error in deletePostImagesAction:", error);
    return {
      success: false,
      error: "이미지 삭제 처리 중 알 수 없는 오류가 발생했습니다.",
    };
  }
};
