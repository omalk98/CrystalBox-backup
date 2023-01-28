import { Router } from 'express';

import { Cors, validateGateway } from '../middleware/index.js';
import {
  validateUserAccess,
  getUserDetails,
  createUserTag,
  replaceUserTag,
  removeUserTag
} from '../controllers/gateway.js';

const gatewayRouter = Router();
const baseAPI = '/api/v1';
const gatewayAPI = `${baseAPI}/gateway`;

gatewayRouter.use(Cors);
gatewayRouter.use(validateGateway);

gatewayRouter.get(`${gatewayAPI}/access/:key/:uuid`, validateUserAccess);

gatewayRouter.get(`${gatewayAPI}/user-info/:key/:uuid`, getUserDetails);

gatewayRouter.post(`${gatewayAPI}/create-tag/:key/:uuid`, createUserTag);

gatewayRouter.put(`${gatewayAPI}/replace-tag/:key/:uuid`, replaceUserTag);

gatewayRouter.delete(`${gatewayAPI}/remove-tag/:key/:uuid`, removeUserTag);

export default gatewayRouter;
