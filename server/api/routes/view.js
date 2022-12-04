import { Router } from 'express';
import { mainPage, forgotPassword } from '../controllers/view.js';
import { validatePasswordLink } from '../middleware/index.js';

const viewRouter = Router();

viewRouter.get(
  '/user/forgot-password/:id',
  validatePasswordLink,
  forgotPassword
);

viewRouter.get('*', mainPage);

export default viewRouter;
