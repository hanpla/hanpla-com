import { z } from "zod";

export const signUpSchema = z
  .object({
    nickname: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다.")
      .max(8, "닉네임은 8자 이하여야 합니다."),
    username: z
      .string()
      .min(4, "아이디는 4자 이상이어야 합니다.")
      .max(8, "아이디는 8자 이하여야 합니다."),
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
  username: z
    .string()
    .min(4, "아이디는 4자 이상이어야 합니다.")
    .max(8, "아이디는 8자 이하여야 합니다."),
  password: z
    .string()
    .min(4, "비밀번호는 4자 이상이어야 합니다.")
    .max(8, "비밀번호는 8자 이하여야 합니다."),
});

export type LoginInput = z.infer<typeof loginSchema>;
