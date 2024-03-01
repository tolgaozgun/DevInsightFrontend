export type UserModel = {
  id: string;
  name: string;
  username: string;
  email: string;
  picture: string;
  accessToken?: string;
  refreshToken?: string;
};

export type RegisterDetails = {
  name: string;
  username: string;
  email: string;
  password: string;
};
