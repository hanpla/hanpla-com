import { AuthState } from "../types/auth";

/**
 * 인증 관련 에러 응답을 생성하는 공통 유틸리티
 * @param message 사용자에게 보여줄 에러 메시지
 * @param inputs 유지하고 싶은 입력값 객체 (userId, nickname, userPassword 등)
 */
export const createAuthError = (
  message: string,
  inputs?: AuthState["inputs"],
): AuthState => ({
  success: false,
  message,
  inputs: inputs || {},
});
