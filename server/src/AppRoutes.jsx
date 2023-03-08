import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './Components/Common';

const PersistLogin = lazy(() => import('./PersistLogin'));
const Home = lazy(() => import('./Pages/Home'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword'));
const ProtectedRoutes = lazy(() =>
  import('./Components/Protected/ProtectedRoutes')
);
const RoleProtectedRoutes = lazy(() =>
  import('./Components/Protected/RoleProtectedRoutes')
);
const About = lazy(() => import('./Pages/About'));
const ErrorPage = lazy(() => import('./Pages/ErrorPage'));
const Login = lazy(() => import('./Pages/Login'));
const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Profile = lazy(() => import('./Pages/Profile'));
const Users = lazy(() => import('./Pages/Admin/Users'));
const Analytics = lazy(() => import('./Pages/Admin/Analytics'));
const ReissueRFID = lazy(() => import('./Pages/Admin/Utilities/ReissueRFID'));
const CreateUser = lazy(() => import('./Pages/Admin/Utilities/CreateUser'));
const UserInfo = lazy(() => import('./Pages/UserInfo'));
const LockSystem = lazy(() => import('./Pages/Admin/Utilities/LockSystem'));

const TrackingRecord = lazy(() => import('./Pages/User/TrackingRecord'));

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
