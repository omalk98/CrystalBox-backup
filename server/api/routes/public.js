import { Router } from 'express';

import {
  login,
  logout,
  refreshToken,
  sendResetPasswordLink
} from '../controllers/public.js';

const baseAPI = '/api/v1';
const publicRouter = Router();

publicRouter.get(`${baseAPI}/logout`, logout);

publicRouter.get(`${baseAPI}/refresh-token`, refreshToken);

publicRouter.post(`${baseAPI}/login`, login);

publicRouter.get(`${baseAPI}/forgot-password`, sendResetPasswordLink);

export default publicRouter;
