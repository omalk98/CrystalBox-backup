import {
  Users,
  PasswordTokens,
  Gateway,
  GatewayAccess
} from '../models/index.js';
import { verifyPasswordToken } from '../services/index.js';

const validatePasswordLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    if (!token || !id) {
      res.redirect('/login');
      return;
    }
    const tokenExists = await PasswordTokens.findOne({ token });
    const user_id = await verifyPasswordToken(id, token);
    if (!tokenExists || !user_id) res.redirect('/user/forgot-password');
    else next();
  } catch {
    res.sendStatus(500);
  }
};

const validateAdmin = async (req, res, next) => {
  const { autherization } = req.headers;
  next();
  // to be implemented
};

const validateUser = async (req, res, next) => {
  const { autherization } = req.headers;
  next();
  // to be implemented
};

const validateGateway = async (req, res, next) => {
  const { gateway_id } = req.headers;
  const { key, uuid } = req.params;

  const gateway = await Gateway.findById(gateway_id);
  if (!gateway) {
    await GatewayAccess.create({
      gateway: gateway_id,
      key,
      uuid,
      code: 407,
      description: 'Gateway Not Found'
    });
    res.sendStatus(407);
    return;
  }
  next();
};

export { validatePasswordLink, validateAdmin, validateUser, validateGateway };
