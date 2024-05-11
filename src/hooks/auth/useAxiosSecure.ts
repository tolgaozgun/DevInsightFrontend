import { useEffect } from 'react';
import { axiosSecure } from '../../services/axios';
import useGetToken from './useGetToken';
import { useRefresh } from './useRefresh';

const useAxiosSecure = () => {
  const refresh = useRefresh();
  const { accessToken, refreshToken } = useGetToken();

  useEffect(() => {
    const requestIntercept = axiosSecure.interceptors.request.use(
      (config) => {
        if (!config?.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosSecure(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosSecure;
};

export default useAxiosSecure;
