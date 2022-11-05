import { Router } from 'express';

import {
  dashboard,
  updateUserDetails,
  updatePersonalDetails,
  resetUserPassword
} from '../controllers/common.js';

const commonRouter = Router();
const baseAPI = '/api/v1';
const dataAPI = `${baseAPI}/data`;

commonRouter.get(`${dataAPI}/common/dashboard`, dashboard);

commonRouter.put(
  `${dataAPI}/common/user/update-user-details`,
  updateUserDetails
);

commonRouter.put(
  `${dataAPI}/common/user/update-personal-details`,
  updatePersonalDetails
);

commonRouter.put(`${dataAPI}/common/user/reset-password`, resetUserPassword);
