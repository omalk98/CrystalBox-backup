import { Router } from 'express';

import { validateUser } from '../middleware/index.js';

const userRouter = Router();
const baseAPI = '/api/v1';
const userAPI = `${baseAPI}/data/user`;

userRouter.use(validateUser);

// User routes to be added here

export default userRouter;
