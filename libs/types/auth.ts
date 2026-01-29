export interface AuthState {
  success: boolean;
  message?: string;
  inputs?: {
    userId?: string;
    userNickname?: string;
    userPassword?: string;
  };
}

export interface SessionPayload {
  userId: string;
  nickname: string;
  role: string;
  [key: string]: string;
}
