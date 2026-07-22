"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import * as jose from "jose";

import { getSessionUser } from "@/lib/utils/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateNicknameSchema, updatePasswordSchema } from "@/lib/validations/auth";
import type { UpdateNicknameActionState, UpdatePasswordActionState } from "@/types/profile";

export const updateNickname = async (
  _prevState: UpdateNicknameActionState | null,
  formData: FormData
): Promise<UpdateNicknameActionState> => {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return {
      success: false,
      errors: {
        global: "로그인이 필요한 서비스입니다.",
      },
    };
  }

  const nickname = ((formData.get("nickname") as string) || "").trim();
  const fields = { nickname };

  // 1. Zod 유효성 검사
  const parsed = updateNicknameSchema.safeParse({ nickname });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      success: false,
      errors: {
        nickname: issue?.message || "닉네임 형식이 올바르지 않습니다.",
      },
      fields,
    };
  }

  // 기존 닉네임과 동일한 경우
  if (nickname === sessionUser.nickname) {
    return {
      success: false,
      errors: {
        nickname: "현재 사용 중인 닉네임과 동일합니다.",
      },
      fields,
    };
  }

  const supabase = createAdminClient();

  try {
    // 2. 닉네임 중복 체크 (자기 자신 제외)
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .neq("id", sessionUser.id)
      .maybeSingle();

    if (checkError) {
      console.error("Supabase 닉네임 중복 확인 오류:", checkError);
      throw checkError;
    }

    if (existingUser) {
      return {
        success: false,
        errors: {
          nickname: "이미 사용 중인 닉네임입니다.",
        },
        fields,
      };
    }

    // 3. DB 닉네임 업데이트
    const { error: updateError } = await supabase
      .from("users")
      .update({ nickname })
      .eq("id", sessionUser.id);

    if (updateError) {
      console.error("Supabase 닉네임 업데이트 오류:", updateError);
      throw updateError;
    }

    // 4. JWT 토큰 갱신 및 쿠키 재설정
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET 환경 변수가 누락되었습니다.");
      return {
        success: false,
        errors: {
          global: "서버 설정 오류가 발생했습니다.",
        },
        fields,
      };
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new jose.SignJWT({
      id: sessionUser.id,
      user_id: sessionUser.user_id,
      nickname,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    revalidatePath("/profile");
    revalidatePath("/");

    return {
      success: true,
      fields: { nickname },
    };
  } catch (error) {
    console.error("updateNickname 에러:", error);
    return {
      success: false,
      errors: {
        global: "닉네임 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      fields,
    };
  }
};

export const updatePassword = async (
  _prevState: UpdatePasswordActionState | null,
  formData: FormData
): Promise<UpdatePasswordActionState> => {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return {
      success: false,
      errors: {
        global: "로그인이 필요한 서비스입니다.",
      },
    };
  }

  const currentPassword = (formData.get("currentPassword") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";
  const confirmNewPassword = (formData.get("confirmNewPassword") as string) || "";

  // 1. Zod 유효성 검사
  const parsed = updatePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmNewPassword,
  });

  if (!parsed.success) {
    const errors: {
      currentPassword?: string;
      newPassword?: string;
      confirmNewPassword?: string;
    } = {};

    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field as keyof typeof errors]) {
        errors[field as keyof typeof errors] = issue.message;
      }
    });

    return {
      success: false,
      errors,
    };
  }

  const supabase = createAdminClient();

  try {
    // 2. 현재 비밀번호 검증을 위한 유저 조회
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("password_hash")
      .eq("id", sessionUser.id)
      .maybeSingle();

    if (fetchError || !user) {
      console.error("Supabase 유저 비밀번호 조회 오류:", fetchError);
      throw fetchError || new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!passwordMatch) {
      return {
        success: false,
        errors: {
          currentPassword: "현재 비밀번호가 일치하지 않습니다.",
        },
      };
    }

    // 3. 새 비밀번호 암호화 및 업데이트
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: newPasswordHash })
      .eq("id", sessionUser.id);

    if (updateError) {
      console.error("Supabase 비밀번호 업데이트 오류:", updateError);
      throw updateError;
    }

    revalidatePath("/profile");

    return {
      success: true,
    };
  } catch (error) {
    console.error("updatePassword 에러:", error);
    return {
      success: false,
      errors: {
        global: "비밀번호 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
    };
  }
};
