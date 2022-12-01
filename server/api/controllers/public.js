import { compare } from 'bcrypt';
import {
  Users,
  UserDetails,
  Passwords,
  RefreshTokens
} from '../models/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  responseUser,
  verifyRefreshToken,
  NoExtraUser_ID
} from '../common/index.js';

const login = async (req, res) => {
  try {
    const { username, password, rememberMe } = req.body;

    if (!username || !password) throw 401;

    const user = await Users.findOne(
      { $or: [{ email: username }, { username }] },
      NoExtraUser_ID
    );

    if (!user) throw 401;
    const userID = user._id;

    const pass = await Passwords.findById(userID);
    const user_details = await UserDetails.findById(userID);

    if (!user_details || !pass) throw 401;

    const isMatch = await compare(password, pass.hash);

    if (!isMatch) throw 401;

    const token = await generateAccessToken(userID);
    const refreshToken = await generateRefreshToken(userID);

    if (rememberMe) {
      res.cookie('token', refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: 'none'
      });
    } else res.clearCookie('token', { httpOnly: true });

    user.last_login.time = new Date();
    user.last_login.ip = req.ip.split(':').pop();

    await user.save();

    res.status(200).json({
      user: responseUser(user, user_details),
      auth: {
        token,
        roles: user.roles,
        first_login: user.last_login?.time === null
      }
    });
  } catch (err) {
    console.log(err);
    if (err === 401) {
      res.status(401).json({ msg: 'Invalid username or password', code: 401 });
    } else res.sendStatus(500);
  }
};

const logout = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      await RefreshTokens.deleteOne({ token });
      res.clearCookie('token', { httpOnly: true });
    }
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

const refreshToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) throw 401;
    const response = await verifyRefreshToken(token);
    res.status(200).json(response);
  } catch {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
  }
};

export { login, logout, refreshToken };
