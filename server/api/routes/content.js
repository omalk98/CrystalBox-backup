import { Router } from 'express';
import { homeController, footerController } from '../controllers/content.js';

const contentRouter = Router();

const baseAPI = '/api/v1';
const contentAPI = `${baseAPI}/content`;

contentRouter.get(`${contentAPI}/home`, homeController);

contentRouter.get(`${contentAPI}/footer`, footerController);

export default contentRouter;
