export interface AuthState {
  success: boolean;
  message?: string;
}

export interface SessionPayload {
  userId: string;
  nickname: string;
  role: string;
  [key: string]: string;
}
