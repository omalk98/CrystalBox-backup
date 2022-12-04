import { Router } from 'express';
import populateDB from '../controllers/populate-db.js';

const populateDBRouter = Router();

populateDBRouter.get('/populate-db', populateDB);

export default populateDBRouter;
