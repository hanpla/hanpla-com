"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSessionUser } from "@/lib/utils/auth";
import { updateNicknameSchema, updatePasswordSchema } from "@/lib/validations/auth";

export interface ProfileActionState {
  success?: boolean;
  errors?: {
    nickname?: string;
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    global?: string;
  };
}

export const updateNicknameAction = async (
  _prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> => {
  const nickname = (formData.get("nickname") as string) || "";
  
  const parsed = updateNicknameSchema.safeParse({ nickname });
  if (!parsed.success) {
    return {
      success: false,
      errors: {
        nickname: parsed.error.issues[0]?.message,
      },
    };
  }

  const user = await getSessionUser();
  if (!user) {
    return {
      success: false,
      errors: {
        global: "로그인 세션이 만료되었습니다. 다시 로그인해 주세요.",
      },
    };
  }

  const supabase = createAdminClient();

  try {
    // Check if nickname is already taken by another user
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("nickname", nickname)
      .neq("id", user.id)
      .maybeSingle();

    if (checkError) {
      throw checkError;
    }

    if (existingUser) {
      return {
        success: false,
        errors: {
          nickname: "이미 사용 중인 닉네임입니다.",
        },
      };
    }

    // Update nickname
    const { error: updateError } = await supabase
      .from("users")
      .update({ nickname })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    // Revalidate paths to update layout headers immediately
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Update nickname error:", error);
    return {
      success: false,
      errors: {
        global: "닉네임 수정 중 예기치 못한 서버 오류가 발생했습니다.",
      },
    };
  }
};

export const updatePasswordAction = async (
  _prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> => {
  const currentPassword = (formData.get("currentPassword") as string) || "";
  const newPassword = (formData.get("newPassword") as string) || "";
  const confirmNewPassword = (formData.get("confirmNewPassword") as string) || "";

  const parsed = updatePasswordSchema.safeParse({
    currentPassword,
    newPassword,
    confirmNewPassword,
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<ProfileActionState["errors"]> = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof NonNullable<ProfileActionState["errors"]>;
      if (field) {
        fieldErrors[field] = issue.message;
      }
    });

    return {
      success: false,
      errors: fieldErrors,
    };
  }

  const user = await getSessionUser();
  if (!user) {
    return {
      success: false,
      errors: {
        global: "로그인 세션이 만료되었습니다. 다시 로그인해 주세요.",
      },
    };
  }

  const supabase = createAdminClient();

  try {
    // Get password hash from DB
    const { data: dbUser, error: fetchError } = await supabase
      .from("users")
      .select("password_hash")
      .eq("id", user.id)
      .maybeSingle();

    if (fetchError || !dbUser) {
      throw fetchError || new Error("User not found");
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, dbUser.password_hash);
    if (!passwordMatch) {
      return {
        success: false,
        errors: {
          currentPassword: "현재 비밀번호가 일치하지 않습니다.",
        },
      };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: newPasswordHash })
      .eq("id", user.id);

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error) {
    console.error("Update password error:", error);
    return {
      success: false,
      errors: {
        global: "비밀번호 수정 중 예기치 못한 서버 오류가 발생했습니다.",
      },
    };
  }
};
