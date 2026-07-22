export interface UpdateNicknameActionState {
  success?: boolean;
  errors?: {
    nickname?: string;
    global?: string;
  };
  fields?: {
    nickname?: string;
  };
}

export interface UpdatePasswordActionState {
  success?: boolean;
  errors?: {
    currentPassword?: string;
    newPassword?: string;
    confirmNewPassword?: string;
    global?: string;
  };
}

export type ProfileTabType = "info" | "posts";
