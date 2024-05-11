import { AxiosInstance } from 'axios';

import axios from 'axios';
import { baseUrl } from '../../constants/api';
import { RLogin, RegisterDetails, Tokens, UserModel } from '../../types';
import { Response } from '../../types/ResponseTypes';

export async function login(email: string, password: string): Promise<Response<UserModel>> {
  const res = await axios
    .post<Response<RLogin>>(`${baseUrl}/auth/login`, {
      email,
      password,
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      return err;
    });
  return res.data;
}

export async function logout(accessToken: string | null) {
  const res = await axios
    .post<Response<null>>(`${baseUrl}/auth/logout`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      return err;
    });
  return res.data;
}

export async function register(userDetails: RegisterDetails): Promise<Response<UserModel>> {
  const res = await axios
    .post<Response<UserModel>>(`${baseUrl}/auth/register`, userDetails)
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      return err;
    });
  return res.data;
}

export async function refresh(refreshToken: string): Promise<Response<Tokens>> {
  const res = await axios
    .get<Response<Tokens>>(`${baseUrl}/auth/refresh`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .catch((err) => {
      if (err.response) {
        return err.response;
      }
      return err;
    });
  return res.data;
}

export async function getCurrentUser(axiosSecure: AxiosInstance): Promise<Response<UserModel>> {
  const res = await axiosSecure.get<Response<UserModel>>(`${baseUrl}/auth/me`).catch((err) => {
    if (err.response) {
      return err.response;
    }
    return err;
  });
  return res.data;
}
