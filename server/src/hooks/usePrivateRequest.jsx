import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { axiosPrivate } from '../requests/axios';
import useRefresh from './useRefresh';
import useLogout from './useLogout';

export default function usePrivateRequest() {
  const refresh = useRefresh();
  const auth = useSelector((state) => state.auth);
  const logout = useLogout();

  useEffect(() => {
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers?.Authorization) {
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const data = await refresh();
            prevRequest.headers.Authorization = `Bearer ${data?.auth?.token}`;
          } catch {
            await logout();
          }
          return axiosPrivate(prevRequest);
        }
        return err;
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(resInterceptor);
      axiosPrivate.interceptors.request.eject(reqInterceptor);
    };
  }, [refresh, auth]);

  return axiosPrivate;
}
