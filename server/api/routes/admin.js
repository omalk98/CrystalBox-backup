import { Router } from 'express';

import {
  userDetails,
  personalDetails,
  adminAnalytics,
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
const baseAPI = '/api/v1/data/admin';

adminRouter.put(`${baseAPI}/user/update-target-user-details`, userDetails);

adminRouter.get(`${baseAPI}/analytics`, adminAnalytics);

adminRouter.put(
  `${baseAPI}/user/update-target-personal-details`,
  personalDetails
);

adminRouter.get(`${baseAPI}/all-users`, allUsers);

adminRouter.get(`${baseAPI}/user/:id`, userByID);

// Add route to create a new user, use POST method and url /api/v1/data/admin/create-user
// import and pass in the controller function
// ${baseAPI}/create-user is the short form

adminRouter.post(`${baseAPI}/create-user`, createUser);

adminRouter.put(`${baseAPI}/activate-user-toggle/:id`, activateUserToggle);

adminRouter.put(`${baseAPI}/lock-user-toggle/:id`, lockUserToggle);

adminRouter.delete(`${baseAPI}/delete-user/:id`, deleteUser);

adminRouter.put(`${baseAPI}/bulk-deactivate-users`, bulkDeactivateUsers);

adminRouter.put(`${baseAPI}/bulk-lock-users`, bulkLockUsers);

adminRouter.delete(`${baseAPI}/bulk-delete-users`, bulkDeleteUsers);

export default adminRouter;
