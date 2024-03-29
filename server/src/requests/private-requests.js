import usePrivateRequest from '../hooks/usePrivateRequest';
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

const graphData = (signal) =>
  options(`${adminBaseRoute}/analytics/graphs`, httpType.GET, signal);

const recordData = (signal) =>
  options(`${adminBaseRoute}/analytics/records`, httpType.GET, null, signal);

const Get = {
  dashboardData,
  allUsers,
  userById,
  graphData,
  recordData
};

// ============================================================

// Post Requests
// ============================================================
const createUser = (payload) =>
  options(`${adminBaseRoute}/create-user`, httpType.POST, payload);

const Post = {
  createUser
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

const toggleActivateUser = (id) =>
  options(`${adminBaseRoute}/activate-user-toggle/${id}`, httpType.PUT);

const toggleLockUser = (id) =>
  options(`${adminBaseRoute}/lock-user-toggle/${id}`, httpType.PUT);

const bulkDeactivateUsers = (ids) =>
  options(
    `${adminBaseRoute}/bulk-deactivate-users`,
    httpType.PUT,
    { ids },
    null
  );

const bulkLockUsers = (ids) =>
  options(`${adminBaseRoute}/bulk-lock-users`, httpType.PUT, { ids }, null);

const Put = {
  userDetails,
  personalDetails,
  resetPassword,
  adminUserDetails,
  adminPersonalDetails,
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
  options(
    `${adminBaseRoute}/bulk-delete-users`,
    httpType.DELETE,
    { ids },
    null
  );

const Delete = {
  deleteUser,
  bulkDeleteUsers
};

// ============================================================

const PrivateRequests = {
  Hook: usePrivateRequest,
  Get,
  Post,
  Put,
  Delete
};

export default PrivateRequests;
