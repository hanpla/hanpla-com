export interface AuthState {
  success: boolean;
  message?: string;
  inputs?: { userId: string };
}

export interface SessionPayload {
  userId: string;
  nickname: string;
  role: string;
  [key: string]: string;
}
