import { useDispatch } from 'react-redux';

import axios from '../Requests/axios';
import { logoutUser, resetUser } from '../Store/Actions';

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
