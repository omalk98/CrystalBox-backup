import { Router } from 'express';

import { validateAdmin } from '../middleware/index.js';
import {
  userDetails,
  personalDetails,
  graphData,
  recordData,
  allUsers,
  userByID,
  createUser,
  activateUserToggle,
  lockUserToggle,
  deleteUser,
  bulkDeactivateUsers,
  bulkLockUsers,
  bulkDeleteUsers
} from '../controllers/admin.js';

const adminRouter = Router();
const baseAPI = '/api/v1';
const adminAPI = `${baseAPI}/data/admin`;

adminRouter.use(validateAdmin);

adminRouter.put(`${adminAPI}/user/update-target-user-details`, userDetails);

adminRouter.get(`${adminAPI}/analytics/graphs`, graphData);

adminRouter.get(`${adminAPI}/analytics/records`, recordData);

adminRouter.put(
  `${adminAPI}/user/update-target-personal-details`,
  personalDetails
);

adminRouter.get(`${adminAPI}/all-users`, allUsers);

adminRouter.get(`${adminAPI}/user/:id`, userByID);

adminRouter.post(`${adminAPI}/create-user`, createUser);

adminRouter.post(`${adminAPI}/create-user`, createUser);

adminRouter.put(`${adminAPI}/activate-user-toggle/:id`, activateUserToggle);

adminRouter.put(`${adminAPI}/lock-user-toggle/:id`, lockUserToggle);

adminRouter.delete(`${adminAPI}/delete-user/:id`, deleteUser);

adminRouter.put(`${adminAPI}/bulk-deactivate-users`, bulkDeactivateUsers);

adminRouter.put(`${adminAPI}/bulk-lock-users`, bulkLockUsers);

adminRouter.delete(`${adminAPI}/bulk-delete-users`, bulkDeleteUsers);

export default adminRouter;
