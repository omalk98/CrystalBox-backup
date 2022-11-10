import jwt from 'jsonwebtoken';
import { Tokens, Users } from '../models/index.js';
import { responseUser } from './response-user.js';

const generateAccessToken = async (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10s'
  });

const generateRefreshToken = async (id) => {
  const period = 7;
  const expires = Date.now() + 1000 * 60 * 60 * 24 * period; // 7 days
  const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: `${period}d`
  });

  try {
    await Tokens.create({ id, token, expires });
  } catch (err) {
    throw new Error(err);
  }

  return token;
};

const verifyAccessToken = async (token, allowedRoles) => {
  if (!token) return false;
  const id = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => (err ? false : decoded.id)
  );

  try {
    const user = await Users.findOne({ 'security_details.id': id });
    if (
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
  if (!token) return false;
  const id = jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => (err ? false : decoded.id)
  );

  let user = null;
  try {
    const refresh = await Tokens.findOne({ token });
    user = await Users.findOne({ 'security_details.id': id });
    if (
      !refresh ||
      refresh.token !== token ||
      refresh.expires < Date.now() ||
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
