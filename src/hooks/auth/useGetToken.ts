import Cookies from 'js-cookie';

const useGetToken = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  return { accessToken, refreshToken };
};

export default useGetToken;
