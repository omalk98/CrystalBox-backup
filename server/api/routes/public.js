import { Router } from 'express';

import { login, logout, refreshToken } from '../controllers/public.js';

const baseAPI = '/api/v1';
const publicRouter = Router();

publicRouter.post(`${baseAPI}/login`, login);

publicRouter.get(`${baseAPI}/logout`, logout);

publicRouter.get(`${baseAPI}/refresh-token`, refreshToken);

export default publicRouter;
