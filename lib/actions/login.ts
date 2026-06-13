"use server";

import bcrypt from "bcryptjs";
import * as jose from "jose";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { loginSchema } from "@/lib/validations/auth";

export interface ActionState {
  success?: boolean;
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
    // Return a generic error for any failed validation to align with security requirement
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
      console.error("Supabase error during login query:", error);
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

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET environment variable is missing.");
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

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      errors: {
        global: "로그인 중 서버 오류가 발생했습니다. 다시 시도해 주세요.",
      },
      fields,
    };
  }
};
