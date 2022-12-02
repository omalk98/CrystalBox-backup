import { Router } from 'express';

import {
  dashboard,
  updateUserDetails,
  updatePersonalDetails,
  resetUserPassword,
  forgotPassword
} from '../controllers/common.js';

const commonRouter = Router();
const baseAPI = '/api/v1';
const dataAPI = `${baseAPI}/data/common`;

commonRouter.get(`${dataAPI}/dashboard`, dashboard);

commonRouter.put(`${dataAPI}/user/update-user-details`, updateUserDetails);

commonRouter.put(
  `${dataAPI}/user/update-personal-details`,
  updatePersonalDetails
);

commonRouter.put(`${dataAPI}/user/reset-password`, resetUserPassword);

commonRouter.post(`${baseAPI}/forgot-password`, forgotPassword);

export default commonRouter;
