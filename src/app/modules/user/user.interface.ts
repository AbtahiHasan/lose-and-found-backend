export type TUser = {
  username: string;
  email: string;
  password: string;

  role: 'user' | 'admin';
};

export type TUpdateProfile = {
  username: string;
  email: string;
};
