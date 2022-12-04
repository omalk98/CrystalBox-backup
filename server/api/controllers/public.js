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

    const reset_link = await generatePasswordToken(user._id);

    sendMail({
      to: email,
      subject: 'CrystalBox - Password Reset',
      html: `
      <div>
      <h1 style="background: #808080; color: #fff;">Password Reset</h1>
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>If you did <strong>NOT</strong> request a <u>password reset</u>, please ignore this email.</p>
        <br />
        <p>This link will expire in 15 minutes.</p>
        <p>Click <a href="${reset_link}">here</a> to reset your password</p>
        <p>Or copy and paste the following link into your browser:</p>
        <br />
        <p>${reset_link}</p>
      </div>
      `
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
