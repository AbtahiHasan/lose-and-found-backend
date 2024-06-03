export type TUserRole = 'user' | 'admin';
export type TLogin = {
  username: string;
  password: string;
};

export type TChangePassword = {
  currentPassword: string;
  newPassword: string;
};
