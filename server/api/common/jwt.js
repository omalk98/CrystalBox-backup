import jwt from 'jsonwebtoken';
import { AccessTokens, RefreshTokens, Users } from '../models/index.js';
import { responseUser } from './response-user.js';

const generateAccessToken = async (id) => {
  try {
    const period = 20;
    const expires = Date.now() + 1000 * 60 * period; // 20 minutes
    const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: `${period}m`
    });

    await AccessTokens.create({ token, expires });
    return token;
  } catch {
    throw 500;
  }
};

const generateRefreshToken = async (id) => {
  try {
    const period = 7;
    const expires = Date.now() + 1000 * 60 * 60 * 24 * period; // 7 days
    const token = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: `${period}d`
    });

    await RefreshTokens.create({ token, expires });
    return token;
  } catch {
    throw 500;
  }
};

const verifyAccessToken = async (token, allowedRoles) => {
  try {
    if (!token) return false;
    const id = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => (err ? false : decoded.id)
    );

    if (!id) return false;

    const access = await AccessTokens.findOne({ token });
    const user = await Users.findOne(id);
    if (
      !access ||
      access.token !== token ||
      access.expires < Date.now() ||
      user._id !== id ||
      user.roles.find((role) => allowedRoles.includes(role)) === -1
    ) {
      await AccessTokens.deleteOne({ token: access.token });
      return false;
    }
    return true;
  } catch {
    throw 500;
  }
};

const verifyRefreshToken = async (token) => {
  try {
    if (!token) return false;
    const id = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => (err ? false : decoded.id)
    );

    if (!id) return false;

    const refresh = await RefreshTokens.findOne({ token });
    const user = await Users.findById(id);
    if (
      !refresh ||
      refresh.token !== token ||
      refresh.expires < Date.now() ||
      user._id !== id
    ) {
      await RefreshTokens.deleteOne({ token: refresh.token });
      return false;
    }
    return {
      user: responseUser(user),
      auth: {
        token: generateAccessToken(id),
        roles: user.server_details.roles
      }
    };
  } catch {
    throw 500;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
