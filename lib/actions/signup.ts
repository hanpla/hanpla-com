"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

import { createAdminClient } from "@/lib/supabase/admin";
import { signUpSchema } from "@/lib/validations/auth";

export interface ActionState {
  success?: boolean;
  errors?: {
    nickname?: string;
    user_id?: string;
    password?: string;
    confirmPassword?: string;
    global?: string;
  };
  fields?: {
    nickname?: string;
    user_id?: string;
  };
}

export const signup = async (
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> => {
  const nickname = (formData.get("nickname") as string) || "";
  const user_id = (formData.get("user_id") as string) || "";
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";

  const fields = { nickname, user_id };

  // 1. Zod 유효성 검사
  const parsed = signUpSchema.safeParse({
    nickname,
    user_id,
    password,
    confirmPassword,
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    });

    return {
      success: false,
      errors: {
        nickname: errors.nickname,
        user_id: errors.user_id,
        password: errors.password,
        confirmPassword: errors.confirmPassword,
      },
      fields,
    };
  }

  const supabase = createAdminClient();

  try {
    // 2. 아이디 중복 체크
    const { data: existingUser, error: checkUserError } = await supabase
      .from("users")
      .select("id")
      .eq("user_id", user_id)
      .maybeSingle();

    if (checkUserError) {
      console.error("Supabase 아이디 확인 중 오류:", checkUserError);
      throw checkUserError;
    }

    if (existingUser) {
      return {
        success: false,
        errors: {
          user_id: "이미 사용 중인 아이디입니다.",
        },
        fields,
      };
    }

    // 3. 닉네임 중복 체크
    const { data: existingNickname, error: checkNicknameError } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .maybeSingle();

    if (checkNicknameError) {
      console.error("Supabase 닉네임 확인 중 오류:", checkNicknameError);
      throw checkNicknameError;
    }

    if (existingNickname) {
      return {
        success: false,
        errors: {
          nickname: "이미 사용 중인 닉네임입니다.",
        },
        fields,
      };
    }

    // 4. 비밀번호 암호화
    const passwordHash = await bcrypt.hash(password, 10);

    // 5. DB 등록
    const { error: insertError } = await supabase
      .from("users")
      .insert({
        user_id,
        nickname,
        password_hash: passwordHash,
      });

    if (insertError) {
      console.error("Supabase 신규 회원 등록 오류:", insertError);
      throw insertError;
    }

  } catch (error) {
    console.error("Signup 에러:", error);
    return {
      success: false,
      errors: {
        global: "회원가입 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      },
      fields,
    };
  }

  redirect("/login");
};
