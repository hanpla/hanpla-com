"use server";

import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

// session
import { createSession, deleteSession } from "../session/auth";

// Utils
import { createAuthError, getSafeRedirect } from "../utils/auth";

// Types
import { AuthState, SessionPayload } from "../types/auth";

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const userId = formData.get("userId") as string;
  const password = formData.get("userPassword") as string;
  const callbackUrl = (formData.get("callbackUrl") as string) || "/";
  const currentInputs = { userId };

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("user_id, nickname")
      .eq("user_id", userId)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      console.error("DB 조회 에러:", error.message);
      return createAuthError(
        "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        currentInputs,
      );
    }

    if (!data) {
      return createAuthError(
        "아이디 또는 비밀번호가 일치하지 않습니다.",
        currentInputs,
      );
    }

    const userData: SessionPayload = {
      userId: data.user_id,
      nickname: data.nickname,
      role: "user",
    };

    await createSession(userData);
  } catch (error) {
    console.error("서버 내부 에러:", error);
    return {
      success: false,
      message: "오류가 발생했습니다. 다시 시도해주세요.",
      inputs: { userId: userId },
    };
  }

  redirect(getSafeRedirect(callbackUrl));
}

export async function logoutAction(callbackUrl: string) {
  await deleteSession();

  redirect(getSafeRedirect(callbackUrl));
}
