import Cookies from 'js-cookie';
import { refresh as refreshFn } from '../../services/auth';
import useGetToken from './useGetToken';

export const useRefresh = () => {
  const { accessToken, refreshToken } = useGetToken();

  const refresh = async () => {
    if (!refreshToken) {
      return null;
    }

    const res = await refreshFn(refreshToken);

    if (res.status !== 200 || !res.data || !res.data.accessToken) {
      return res;
    }

    Cookies.set('accessToken', res.data.accessToken, { sameSite: 'strict' });

    return res;
  };

  return refresh;
};
