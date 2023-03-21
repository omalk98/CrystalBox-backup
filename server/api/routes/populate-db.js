import { Router } from 'express';

import {
  createGateways,
  populateUsers,
  populateAccessRecords
} from '../controllers/populate-db.js';

const populateDBRouter = Router();

populateDBRouter.get('/create-gateways', createGateways);

populateDBRouter.get('/populate-users', populateUsers);

populateDBRouter.get('/populate-records', populateAccessRecords);

export default populateDBRouter;
