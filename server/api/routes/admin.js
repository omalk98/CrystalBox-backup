import { Router } from 'express';

import {
  userDetails,
  personalDetails,
  resetUserPassword,
  adminAnalytics,
  allUsers,
  userByID,
  activateUserToggle,
  lockUserToggle,
  deleteUser,
  bulkDeactivateUsers,
  bulkLockUsers,
  bulkDeleteUsers
} from '../controllers/admin.js';

const adminRouter = Router();
const baseAPI = '/api/v1';
const dataAPI = `${baseAPI}/data`;

adminRouter.put(
  `${dataAPI}/admin/user/update-target-user-details`,
  userDetails
);

adminRouter.get(`${dataAPI}/admin/analytics`, adminAnalytics);

adminRouter.put(
  `${dataAPI}/admin/user/update-target-personal-details`,
  personalDetails
);

adminRouter.put(
  `${dataAPI}/admin/user/reset-target-user-password`,
  resetUserPassword
);

adminRouter.get(`${dataAPI}/admin/all-users`, allUsers);

adminRouter.get(`${dataAPI}/admin/user/:id`, userByID);

adminRouter.put(
  `${dataAPI}/admin/activate-user-toggle/:id`,
  activateUserToggle
);

adminRouter.put(`${dataAPI}/admin/lock-user-toggle/:id`, lockUserToggle);

adminRouter.delete(`${dataAPI}/admin/delete-user/:id`, deleteUser);

adminRouter.put(`${dataAPI}/admin/bulk-deactivate-users`, bulkDeactivateUsers);

adminRouter.put(`${dataAPI}/admin/bulk-lock-users`, bulkLockUsers);

adminRouter.delete(`${dataAPI}/admin/bulk-delete-users`, bulkDeleteUsers);

export default adminRouter;
