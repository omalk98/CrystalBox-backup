import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RoleProtectedRoutes({ allowedRoles }) {
  const auth = useSelector((state) => state?.auth);
  const location = useLocation();

  if (auth?.roles?.find((role) => allowedRoles?.includes(role))) {
    return <Outlet />;
  } else if (auth?.isAuthenticated) {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location }}
      />
    );
  } else {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
      />
    );
  }
}
