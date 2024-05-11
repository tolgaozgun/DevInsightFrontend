export type UserModel = {
  id: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

export type RegisterDetails = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type RLogin = {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
};
