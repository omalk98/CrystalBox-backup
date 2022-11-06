import { Router } from 'express';
const contentRouter = Router();

const baseAPI = '/api/v1';
const contentAPI = `${baseAPI}/content`;

import { homeController, footerController } from '../controllers/content.js';

contentRouter.get(`${contentAPI}/home`, homeController);

contentRouter.get(`${contentAPI}/footer`, footerController);

export default contentRouter;