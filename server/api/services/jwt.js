import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { randomBytes } from 'crypto';
import {
  AccessTokens,
  RefreshTokens,
  PasswordTokens,
  Users,
  UserDetails
} from '../models/index.js';
import { responseUser } from './response-user.js';

const generateAccessToken = async (id) => {
  try {
    const period = 20;
    const expires = Date.now() + 1000 * 60 * period; // 20 minutes
    const token = jwt.sign(
      { id, rand: { id: uuid(), secret: randomBytes(64).toString('hex') } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: `${period}m`
      }
    );

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
    const token = jwt.sign(
      { id, rand: { id: uuid(), secret: randomBytes(64).toString('hex') } },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: `${period}d`
      }
    );

    await RefreshTokens.create({ token, expires });
    return token;
  } catch {
    throw 500;
  }
};

const generatePasswordToken = async (id) => {
  try {
    const period = 15;
    const expires = Date.now() + 1000 * 60 * period; // 15 minutes
    const token_uuid = uuid();
    const token = jwt.sign(
      { id, rand: { id: token_uuid, secret: randomBytes(64).toString('hex') } },
      process.env.PASSWORD_TOKEN_SECRET,
      {
        expiresIn: `${period}m`
      }
    );

    await PasswordTokens.create({ token, expires });
    return [token, token_uuid];
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
    const user = await Users.findById(id);

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
    return id;
  } catch (err) {
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
    const user_details = await UserDetails.findById(id);
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
      user: responseUser(user, user_details),
      auth: {
        token: await generateAccessToken(id),
        roles: user.roles
      }
    };
  } catch {
    throw 500;
  }
};

const verifyPasswordToken = async (token_uuid, token) => {
  try {
    if (!token) return false;
    const [id, uid] = jwt.verify(
      token,
      process.env.PASSWORD_TOKEN_SECRET,
      (err, decoded) => (err ? [false, false] : [decoded.id, decoded.rand.id])
    );

    if (!id || token_uuid !== uid) return false;
    const access = await PasswordTokens.findOne({ token });
    const user = await Users.findById(id);

    if (
      !access ||
      access.token !== token ||
      access.expires < Date.now() ||
      user._id !== id
    ) {
      await PasswordTokens.deleteOne({ token: access.token });
      return false;
    }
    return id;
  } catch {
    throw 500;
  }
};

export {
  generateAccessToken,
  generateRefreshToken,
  generatePasswordToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyPasswordToken
};
