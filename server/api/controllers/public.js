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
  NoExtraUser_ID,
  sendMail,
  generatePasswordToken
} from '../services/index.js';

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
        roles: user.roles
      }
    });
  } catch (err) {
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
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
  }
};

const sendResetPasswordLink = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) throw 400;

    const user = await Users.findOne(
      {
        email
      },
      NoExtraUser_ID
    );

    if (!user) {
      res.sendStatus(200);
      return;
    }

    const passwordToken = await generatePasswordToken(user._id);
    const resetLink = `http${process.env.VITE_DEV_NETWORK_IP ? '' : 's'}://${
      process.env.VITE_DEV_NETWORK_IP || process.env.SERVER_ADDRESS
    }${
      process.env.VITE_DEV_NETWORK_IP ? `:${process.env.PORT}` : ''
    }/user/forgot-password?token=${passwordToken}`;

    sendMail({
      to: email,
      subject: 'Reset password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    });

    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Invalid email', code: 400 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

export { login, logout, refreshToken, sendResetPasswordLink };
