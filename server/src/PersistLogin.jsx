import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import useRefresh from './Hooks/useRefresh';

export default function PersistLogin() {
  const refresh = useRefresh();
  const auth = useSelector((state) => state?.auth?.token);
  const rememberMe = localStorage.getItem('c_box_remember_me');
  useEffect(() => {
    const verify = async () => {
      try {
        await refresh();
      } catch (err) {
        // Do nothing
      }
    };

    if (!auth && rememberMe) verify();
  }, []);

  return <Outlet />;
}
