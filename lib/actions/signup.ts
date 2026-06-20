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

  const parsed = signUpSchema.safeParse({
    nickname,
    user_id,
    password,
    confirmPassword,
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<ActionState["errors"]> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof NonNullable<ActionState["errors"]>;
      if (field) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
      fields,
    };
  }

  const supabase = createAdminClient();

  try {
    const [userIdCheck, nicknameCheck] = await Promise.all([
      supabase.from("users").select("user_id").eq("user_id", user_id).maybeSingle(),
      supabase.from("users").select("nickname").eq("nickname", nickname).maybeSingle(),
    ]);

    if (userIdCheck.error) {
      console.error("Supabase error checking user_id:", userIdCheck.error);
      throw userIdCheck.error;
    }
    if (nicknameCheck.error) {
      console.error("Supabase error checking nickname:", nicknameCheck.error);
      throw nicknameCheck.error;
    }

    if (userIdCheck.data || nicknameCheck.data) {
      const errors: NonNullable<ActionState["errors"]> = {};
      if (userIdCheck.data) {
        errors.user_id = "이미 존재하는 아이디입니다.";
      }
      if (nicknameCheck.data) {
        errors.nickname = "이미 존재하는 닉네임입니다.";
      }
      return {
        success: false,
        errors,
        fields,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase.from("users").insert({
      user_id,
      nickname,
      password_hash: hashedPassword,
    });

    if (insertError) {
      console.error("Supabase error inserting user:", insertError);
      throw insertError;
    }
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      errors: {
        global: "회원가입 중 서버 오류가 발생했습니다. 다시 시도해 주세요.",
      },
      fields,
    };
  }

  redirect("/login");
};
