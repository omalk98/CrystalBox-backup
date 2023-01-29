import { Router } from 'express';

import { Cors, validateGateway } from '../middleware/index.js';
import {
  validateUserAccess,
  getUserDetailsFromTag,
  getUserDetailsFromEmailOrUsername,
  createUserTag,
  replaceUserTag,
  removeUserTag
} from '../controllers/gateway.js';

const gatewayRouter = Router();
const baseAPI = '/api/v1';
const gatewayAPI = `${baseAPI}/terminal/gateway`;

gatewayRouter.use(Cors);
gatewayRouter.use(validateGateway);

gatewayRouter.get(`${gatewayAPI}/access/:key/:uuid`, validateUserAccess);

gatewayRouter.get(
  `${gatewayAPI}/user-info/:username`,
  getUserDetailsFromEmailOrUsername
);

gatewayRouter.get(`${gatewayAPI}/user-info/:key/:uuid`, getUserDetailsFromTag);

gatewayRouter.post(`${gatewayAPI}/create-tag/:uid/:key`, createUserTag);

gatewayRouter.put(`${gatewayAPI}/replace-tag/:key/:uuid`, replaceUserTag);

gatewayRouter.delete(`${gatewayAPI}/remove-tag/:key`, removeUserTag);

export default gatewayRouter;
