import { compare } from 'bcrypt';
import { Users, Passwords, RefreshTokens } from '../models/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  responseUser,
  verifyRefreshToken
} from '../common/index.js';

const login = async (req, res) => {
  const { username, password, rememberMe } = req.body;

  if (!username || !password) {
    res.status(401).json({ msg: 'Invalid username or password', code: 401 });
    return;
  }

  try {
    const user = await Users.findOne({
      $or: [
        { 'user_details.email': username },
        { 'user_details.username': username }
      ]
    });

    if (!user) {
      res.status(401).json({ msg: 'Invalid username or password', code: 401 });
      return;
    }
    const userID = user.security_details.id;

    const pass = await Passwords.findById(userID);

    if (!pass) {
      res.status(401).json({ msg: 'Invalid username or password', code: 401 });
      return;
    }

    const isMatch = await compare(password, pass.hash);

    if (!isMatch) {
      res.status(401).json({ msg: 'Invalid username or password', code: 401 });
      return;
    }

    let token = null;
    let refreshToken = null;
    try {
      token = await generateAccessToken(userID);
      refreshToken = await generateRefreshToken(userID);
    } catch {
      res.sendStatus(500);
      return;
    }

    if (rememberMe) {
      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      });
    } else res.clearCookie('token', { httpOnly: true });

    user.server_details.last_login = Date.now();
    await user.save();

    res.status(200).json({
      user: responseUser(user),
      auth: {
        token,
        roles: user.server_details.roles
      }
    });
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
};

const logout = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    await RefreshTokens.deleteOne({ token });
    res.clearCookie('token', { httpOnly: true });
  }
  res.sendStatus(200);
};

const refreshToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
    return;
  }
  try {
    const response = await verifyRefreshToken(token);
    res.status(200).json(response);
  } catch {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
  }
};

export { login, logout, refreshToken };
