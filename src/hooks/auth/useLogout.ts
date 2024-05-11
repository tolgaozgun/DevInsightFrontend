import Cookies from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { logout as logoutFn } from '../../services/auth';
import { useToken } from './useToken';

export const useLogout = (navigate: NavigateFunction) => {
  const {accessToken, refreshToken} = useToken();
  const logout = async () => {
    logoutFn(accessToken);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    navigate('/login');
  };

  return { logout };
};
