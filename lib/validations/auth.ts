import { z } from "zod";

export const signUpSchema = z
  .object({
    nickname: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다.")
      .max(8, "닉네임은 8자 이하여야 합니다.")
      .regex(/^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/, "닉네임은 한글과 영문만 입력할 수 있습니다."),
    user_id: z
      .string()
      .min(4, "아이디는 4자 이상이어야 합니다.")
      .max(8, "아이디는 8자 이하여야 합니다.")
      .regex(/^[a-zA-Z0-9]+$/, "아이디는 영문과 숫자만 입력할 수 있습니다."),
    password: z
      .string()
      .min(4, "비밀번호는 4자 이상이어야 합니다.")
      .max(8, "비밀번호는 8자 이하여야 합니다."),
    confirmPassword: z
      .string()
      .min(4, "비밀번호 확인은 4자 이상이어야 합니다.")
      .max(8, "비밀번호 확인은 8자 이하여야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  user_id: z
    .string()
    .min(4, "아이디는 4자 이상이어야 합니다.")
    .max(8, "아이디는 8자 이하여야 합니다."),
  password: z
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(8, "비밀번호는 8자 이하여야 합니다."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const updateNicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다.")
    .max(8, "닉네임은 8자 이하여야 합니다.")
    .regex(/^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/, "닉네임은 한글과 영문만 입력할 수 있습니다."),
});

export type UpdateNicknameInput = z.infer<typeof updateNicknameSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(4, "현재 비밀번호는 4자 이상이어야 합니다.")
      .max(8, "현재 비밀번호는 8자 이하여야 합니다."),
    newPassword: z
      .string()
      .min(4, "새 비밀번호는 4자 이상이어야 합니다.")
      .max(8, "새 비밀번호는 8자 이하여야 합니다."),
    confirmNewPassword: z
      .string()
      .min(4, "새 비밀번호 확인은 4자 이상이어야 합니다.")
      .max(8, "새 비밀번호 확인은 8자 이하여야 합니다."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "새 비밀번호가 일치하지 않습니다.",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
