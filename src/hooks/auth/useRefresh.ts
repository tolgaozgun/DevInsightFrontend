import { useUser } from '../../contexts/UserContext';
import { refresh as refreshFn } from '../../services/auth';
import { axiosSecure } from '../../services/axios';

export const useRefresh = () => {
  const { user } = useUser();

  const token = {
    accessToken: user?.accessToken,
    refreshToken: user?.refreshToken,
  };

  const refresh = async () => {
    if (!token) {
      return null;
    }

    if (!token.refreshToken) {
      return null;
    }

    const res = await refreshFn(token.refreshToken, axiosSecure);

    return res;
  };

  return refresh;
};

export const useRefreshWithToken = (accessToken: string, refreshToken: string) => {
  const token = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  const refresh = async () => {
    if (!token) {
      return null;
    }

    if (!token.refreshToken) {
      return null;
    }

    const res = await refreshFn(token.refreshToken, axiosSecure);

    return res;
  };

  return refresh;
};
