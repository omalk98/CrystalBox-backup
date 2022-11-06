import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const generateAccessToken = (uid) =>
  jwt.sign({ id: uid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });

const generateRefreshToken = (uid) =>
  jwt.sign({ id: uid }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

const verifyAccessToken = (token, uid) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded !== uid) return false;
    else return generateAccessToken(uid);
  });

const verifyRefreshToken = (token, uid) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded !== uid) return false;
    else return generateAccessToken(uid);
  });

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
