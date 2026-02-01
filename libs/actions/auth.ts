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
    return createAuthError(
      "오류가 발생했습니다. 다시 시도해주세요.",
      currentInputs,
    );
  }

  redirect(getSafeRedirect(callbackUrl));
}

export async function signupAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const userNickname = formData.get("userNickname") as string;
  const userId = formData.get("userId") as string;
  const userPassword = formData.get("userPassword") as string;

  const currentInputs = { userId, userNickname, userPassword };

  try {
    const supabase = await createClient();
    const { data: existingUser } = await supabase
      .from("users")
      .select("user_id, nickname")
      .or(`user_id.eq.${userId},nickname.eq.${userNickname}`)
      .maybeSingle();

    if (existingUser) {
      const msg = existingUser.user_id === userId ? "아이디" : "닉네임";
      return createAuthError(`이미 사용중인${msg}입니다.`, currentInputs);
    }

    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: userId,
        password: userPassword,
        nickname: userNickname,
        role: "user",
      },
    ]);

    if (insertError) {
      console.log(insertError);
      return createAuthError(
        "오류가 발생했습니다. 다시 시도해주세요.",
        currentInputs,
      );
    }
  } catch (error) {
    console.error("서버 내부 에러:", error);
    return createAuthError(
      "오류가 발생했습니다. 다시 시도해주세요.",
      currentInputs,
    );
  }
  redirect("/login");
}

export async function logoutAction() {
  await deleteSession();
}
