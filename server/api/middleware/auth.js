import { PasswordTokens, Gateway, GatewayAccess } from '../models/index.js';
import { verifyPasswordToken, verifyAccessToken } from '../services/index.js';

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

const validateUserRole = async (headers, role) => {
  const { authorization } = headers;
  if (!authorization) return false;
  const token = authorization.split(' ')[1];
  const user_id = await verifyAccessToken(token, [role]);
  return user_id;
};

const validateAdmin = async (req, res, next) => {
  if (!req.originalUrl.toLowerCase().includes('/data/admin')) {
    next();
    return;
  }

  const user_id = await validateUserRole(req.headers, 'ADMIN');
  if (!user_id) res.sendStatus(403);
  else next();
};

const validateUser = async (req, res, next) => {
  if (!req.originalUrl.toLowerCase().includes('/data/user')) {
    next();
    return;
  }

  const user_id = await validateUserRole(req.headers, 'USER');
  if (!user_id) res.sendStatus(403);
  else next();
};

const validateGateway = async (req, res, next) => {
  if (!req.originalUrl.toLowerCase().includes('/terminal/gateway')) {
    next();
    return;
  }

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
