import { useDispatch } from 'react-redux';

import axios from '../requests/axios';
import { logoutUser, resetUser } from '../store/actions';

export default function useLogout() {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(logoutUser());
    dispatch(resetUser());
    try {
      await axios.get('logout', {
        withCredentials: true
      });
    } catch {
      // Do nothing
    }
  };

  return logout;
}
