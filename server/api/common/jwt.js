import jwt from 'jsonwebtoken';
import { AccessTokens, RefreshTokens, Users } from '../models/index.js';
import responseUser from './response-user.js';

const generateAccessToken = async (id) => {
  const period = 10;
  const expires = Date.now() + 1000 * period; // 10 seconds
  const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: `${period}s`
  });

  try {
    await AccessTokens.create({ id, token, expires });
  } catch (err) {
    throw new Error(err);
  }

  return token;
};

const generateRefreshToken = async (id) => {
  const period = 7;
  const expires = Date.now() + 1000 * 60 * 60 * 24 * period; // 7 days
  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: `${period}d`
  });

  try {
    await RefreshTokens.create({ id, token, expires });
  } catch (err) {
    throw new Error(err);
  }

  return token;
};

const verifyAccessToken = async (token, allowedRoles) => {
  const id = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => (err ? false : decoded.id)
  );
  if (!token) return false;

  let user = null;
  try {
    const access = await AccessTokens.findOne({ id });
    user = await Users.findOne({ 'security_details.id': id });
    if (
      !access ||
      access.token !== token ||
      access.expires > Date.now() ||
      user.security_details.id !== id ||
      user.server_details.roles.find((role) => allowedRoles.includes(role)) ===
        -1
    ) {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }

  return true;
};

const verifyRefreshToken = async (token) => {
  const id = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => (err ? false : decoded.id)
  );
  if (!token) return false;

  let user = null;
  try {
    const access = await RefreshTokens.findOne({ id });
    user = await Users.findOne({ 'security_details.id': id });
    if (
      !access ||
      !user ||
      access.token !== token ||
      user.security_details.id !== id
    ) {
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }

  return {
    user: responseUser(user),
    auth: {
      token: generateAccessToken(id),
      roles: user.server_details.roles
    }
  };
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
