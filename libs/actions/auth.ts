import { createClient } from "../utils/supabase/server";

// session
import { createSession } from "../session/auth";

// Types
import { AuthState, SessionPayload } from "../types/auth";

export async function loginAction(formData: FormData): Promise<AuthState> {
  const userId = formData.get("userId") as string;
  const password = formData.get("password") as string;

  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select("user_id, name")
      .eq("user_id", userId)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      console.error("조회 중 에러:", error.message);
      return { success: false };
    }

    if (!data) {
      return { success: false };
    }

    const userData: SessionPayload = {
      userId: data.user_id,
      nickname: data.name,
      role: "user",
    };

    await createSession(userData);

    return { success: true };
  } catch (error) {
    console.error("서버 내부 에러:", error);
    return { success: false };
  }
}
