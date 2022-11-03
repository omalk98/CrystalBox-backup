import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoutes() {
  const auth = useSelector((state) => state?.auth?.isAuthenticated);
  const location = useLocation();
  return auth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }}
    />
  );
}
