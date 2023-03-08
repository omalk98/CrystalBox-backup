import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './components/common';

const PersistLogin = lazy(() => import('./PersistLogin'));
const Home = lazy(() => import('./pages/home'));
const ForgotPassword = lazy(() => import('./pages/forgot-password'));
const ProtectedRoutes = lazy(() => import('./components/protected/routes'));
const RoleProtectedRoutes = lazy(() =>
  import('./components/protected/role-routes')
);
const About = lazy(() => import('./pages/about'));
const ErrorPage = lazy(() => import('./pages/404'));
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const Users = lazy(() => import('./pages/admin/users'));
const Analytics = lazy(() => import('./pages/admin/analytics'));
const ReissueRFID = lazy(() => import('./pages/admin/utilities/reissue-rfid'));
const CreateUser = lazy(() => import('./pages/admin/utilities/create-user'));
const UserInfo = lazy(() => import('./pages/user-info'));
const LockSystem = lazy(() => import('./pages/admin/utilities/lock-system'));

const TrackingRecord = lazy(() => import('./pages/user/tracking-record'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader text="Loading" />}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/home"
            // prettier-ignore
            element={(
              <Navigate
                to="/"
                replace
              />
            )}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route path="/console">
            {/* Common Routes */}
            <Route element={<ProtectedRoutes />}>
              <Route
                path="/console/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/console/profile"
                element={<Profile />}
              />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/console/admin"
              element={<RoleProtectedRoutes allowedRoles={['ADMIN']} />}
            >
              <Route
                path="/console/admin/users"
                element={<Users />}
              />

              <Route
                path="/console/admin/users/:id"
                element={<UserInfo />}
              />

              <Route
                path="/console/admin/analytics"
                element={<Analytics />}
              />

              <Route path="/console/admin/utilities">
                <Route
                  path="/console/admin/utilities/reissue-RFID"
                  element={<ReissueRFID />}
                />

                <Route
                  path="/console/admin/utilities/create-user"
                  element={<CreateUser />}
                />

                <Route
                  path="/console/admin/utilities/lock-system"
                  element={<LockSystem />}
                />
              </Route>

              <Route path="/console/admin/settings">{/* coming soon */}</Route>
            </Route>

            {/* User Routes */}
            <Route
              path="/console/user"
              element={<RoleProtectedRoutes allowedRoles={['USER']} />}
            >
              <Route
                path="/console/user/tracking-records"
                element={<TrackingRecord />}
              />
            </Route>
          </Route>

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/forbidden"
            element={<ErrorPage type="403" />}
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
