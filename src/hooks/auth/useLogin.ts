import Cookies from 'js-cookie';
import { login as loginFn } from '../../services/auth';

export const useLogin = () => {
  const login = async (email: string, password: string) => {
    const res = await loginFn(email, password);

    // Return without setting cookies if login failed
    if (res.status !== 200 || !res.data || !res.data.accessToken) {
      return res;
    }

    // Set the cookies and return the user
    Cookies.set('accessToken', res.data.accessToken, { sameSite: 'strict' });
    Cookies.set('refreshToken', res.data.refreshToken, { sameSite: 'strict' });
    return res;
  };

  return { login };
};
