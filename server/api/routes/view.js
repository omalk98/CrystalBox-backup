import { Router } from 'express';
import { mainPage, forgotPassword } from '../controllers/view.js';

const viewRouter = Router();

viewRouter.get('/user/forgot-password/:id', forgotPassword);

viewRouter.get('*', mainPage);

export default viewRouter;
