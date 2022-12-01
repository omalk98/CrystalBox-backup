import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './Components/Common';

const PersistLogin = lazy(() => import('./PersistLogin'));
const Home = lazy(() => import('./Components/Base/Main/Home/Home'));
const ForgotPassword = lazy(() =>
  import('./Components/Base/ForgotPassword/ForgotPassword')
);
const ProtectedRoutes = lazy(() =>
  import('./Components/ProtectedRoute/ProtectedRoutes')
);
const RoleProtectedRoutes = lazy(() =>
  import('./Components/ProtectedRoute/RoleProtectedRoutes')
);
const About = lazy(() => import('./Components/Base/Main/About/About'));
const ErrorPage = lazy(() => import('./Components/Base/ErrorPage/ErrorPage'));
const Login = lazy(() => import('./Components/Login/Login'));
const Dashboard = lazy(() =>
  import('./Components/ProtectedRoute/Dashboard/Dashboard')
);
const Profile = lazy(() =>
  import('./Components/ProtectedRoute/Profile/Profile')
);
const Users = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Users/Users')
);
const Analytics = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Analytics/AnalyticsComponent')
);
const ReissueRFID = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Utilities/ReissueRFID/ReissueRFID')
);
const CreateUser = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Utilities/CreateUser/CreateUser')
);
const UserInfo = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Users/UserInfo/UserInfo')
);
const LockSystem = lazy(() =>
  import('./Components/ProtectedRoute/Admin/Utilities/LockSystem/LockSystem')
);

const TrackingRecord = lazy(() =>
  import('./Components/ProtectedRoute/User/TrackingRecord/TrackingRecord')
);

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
