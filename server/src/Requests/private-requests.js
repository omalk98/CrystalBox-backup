import usePrivateRequest from '../Hooks/usePrivateRequest';
import httpType from './httpType';

const adminBaseRoute = '/data/admin';
// const userBaseRoute = '/data/user';
const commonBaseRoute = '/data/common';

const options = (url, method, payload, signal) => ({
  url,
  method,
  signal,
  data: JSON.stringify(payload)
});

// Get Requests
// ============================================================

const dashboardData = (signal) =>
  options(`${commonBaseRoute}/dashboard`, httpType.GET, null, signal);

const allUsers = (signal) =>
  options(`${adminBaseRoute}/all-users`, httpType.GET, null, signal);

const userById = (id, signal) =>
  options(`${adminBaseRoute}/user/${id}`, httpType.GET, null, signal);

const analyticsData = (signal) =>
  options(`${adminBaseRoute}/analytics`, httpType.GET, null, signal);

const Get = {
  dashboardData,
  allUsers,
  userById,
  analyticsData
};

// ============================================================

// Put Requests
// ============================================================

const userDetails = (payload) =>
  options(`${commonBaseRoute}/user/update-user-details`, httpType.PUT, payload);

const personalDetails = (payload) =>
  options(
    `${commonBaseRoute}/user/update-personal-details`,
    httpType.PUT,
    payload
  );

const resetPassword = (payload) =>
  options(`${commonBaseRoute}/user/reset-password`, httpType.PUT, payload);

const adminUserDetails = (payload) =>
  options(
    `${adminBaseRoute}/user/update-target-user-details`,
    httpType.PUT,
    payload
  );

const adminPersonalDetails = (payload) =>
  options(
    `${adminBaseRoute}/user/update-target-personal-details`,
    httpType.PUT,
    payload
  );

const adminResetPassword = (payload) =>
  options(
    `${adminBaseRoute}/user/reset-target-user-password`,
    httpType.PUT,
    payload
  );

const toggleActivateUser = (id) =>
  options(`${adminBaseRoute}/activate-user-toggle/${id}`, httpType.PUT);

const toggleLockUser = (id) =>
  options(`${adminBaseRoute}/lock-user-toggle/${id}`, httpType.PUT);

const bulkDeactivateUsers = (ids) =>
  options(`${adminBaseRoute}/bulk-deactivate-users`, httpType.PUT, ids, null);

const bulkLockUsers = (ids) =>
  options(`${adminBaseRoute}/bulk-lock-users`, httpType.PUT, ids, null);

const Put = {
  userDetails,
  personalDetails,
  resetPassword,
  adminUserDetails,
  adminPersonalDetails,
  adminResetPassword,
  toggleActivateUser,
  toggleLockUser,
  bulkLockUsers,
  bulkDeactivateUsers
};

// ============================================================

// Delete Requests
// ============================================================

const deleteUser = (id) =>
  options(`${adminBaseRoute}/delete-user/${id}`, httpType.DELETE);

const bulkDeleteUsers = (ids) =>
  options(`${adminBaseRoute}/bulk-delete-users`, httpType.DELETE, ids, null);

const Delete = {
  deleteUser,
  bulkDeleteUsers
};

// ============================================================

const PrivateRequests = {
  Hook: usePrivateRequest,
  Get,
  Put,
  Delete
};

export default PrivateRequests;
