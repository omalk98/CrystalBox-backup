import { useSelector, useDispatch } from 'react-redux';

import axios from '../Requests/axios';
import { authenticateUser, setUser } from '../Store/Actions';
import useLogout from './useLogout';

export default function useRefresh() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const logout = useLogout();

  const refresh = async () => {
    try {
      const res = await axios.get('/refresh-token', {
        withCredentials: true
      });
      if (res.status !== 200) throw new Error('Invalid Credentials');
      dispatch(authenticateUser(res.data?.auth));
      if (!user?.length) dispatch(setUser(res.data?.user));
    } catch {
      await logout();
    }
  };
  return refresh;
}
