"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import * as jose from "jose";

import { createAdminClient } from "@/lib/supabase/admin";
import { loginSchema } from "@/lib/validations/auth";
import type { SessionUser } from "@/lib/utils/auth";

export interface ActionState {
  success?: boolean;
  user?: SessionUser | null;
  errors?: {
    user_id?: string;
    password?: string;
    global?: string;
  };
  fields?: {
    user_id?: string;
  };
}

export const login = async (
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> => {
  const user_id = (formData.get("user_id") as string) || "";
  const password = (formData.get("password") as string) || "";

  const fields = { user_id };

  const parsed = loginSchema.safeParse({ user_id, password });

  if (!parsed.success) {
    return {
      success: false,
      errors: {
        global: "아이디 또는 비밀번호가 일치하지 않습니다.",
      },
      fields,
    };
  }

  const supabase = createAdminClient();

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, user_id, password_hash, nickname")
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) {
      console.error("Supabase 로그인 에러:", error);
      throw error;
    }

    if (!user) {
      return {
        success: false,
        errors: {
          global: "아이디 또는 비밀번호가 일치하지 않습니다.",
        },
        fields,
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return {
        success: false,
        errors: {
          global: "아이디 또는 비밀번호가 일치하지 않습니다.",
        },
        fields,
      };
    }

    // JWT 토큰 생성
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET 환경 변수가 누락되었습니다.");

      return {
        success: false,
        errors: {
          global: "서버 설정 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        },
        fields,
      };
    }

    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new jose.SignJWT({
      id: user.id,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return {
      success: true,
      user: {
        id: user.id,
        user_id: user.user_id,
        nickname: user.nickname,
      },
    };
  } catch (error) {
    console.error("Login 에러:", error);
    return {
      success: false,
      errors: {
        global: "로그인 중 서버 오류가 발생했습니다. 다시 시도해 주세요.",
      },
      fields,
    };
  }
};
