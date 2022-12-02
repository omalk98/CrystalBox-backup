import fs from 'fs';
import { compare, hash } from 'bcrypt';
import { Passwords, AccessTokens, PasswordTokens } from '../models/index.js';
import { verifyAccessToken, verifyPasswordToken } from '../services/index.js';

const dashboardData = JSON.parse(
  fs.readFileSync('./data/dashboard-data.json', 'utf8')
);

const dashboard = (req, res) => {
  res.status(200).json(dashboardData);
};

const updateUserDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const updatePersonalDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const resetUserPassword = async (req, res) => {
  try {
    const { old_password, new_password, confirm_new_password } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const tokenExists = await AccessTokens.findOne({ token });
    const id = await verifyAccessToken(token, ['ADMIN', 'USER']);

    if (!tokenExists || !id) throw 401;
    else if (new_password !== confirm_new_password) throw 400;

    const user_password = await Passwords.findById(id);

    if (!user_password) throw 404;
    else if (!(await compare(old_password, user_password.hash))) throw 403;
    else if (
      old_password === new_password ||
      (await compare(new_password, user_password.hash))
    ) {
      throw 409;
    }

    user_password.hash = await hash(new_password, 10);
    await user_password.save();
    await AccessTokens.deleteOne({ token });

    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Passwords do not match', code: 400 });
    } else if (err === 401) {
      res.status(401).json({ msg: 'Invalid token', code: 401 });
    } else if (err === 403) {
      res.status(403).json({ msg: 'Invalid password', code: 403 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else if (err === 409) {
      res.status(409).json({ msg: 'Cannot reuse same password', code: 409 });
    } else res.sendStatus(500);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { new_password, confirm_new_password } = req.body;
    const { token } = req.query;
    const tokenExists = await PasswordTokens.findOne({ token });
    const id = await verifyPasswordToken(token, ['ADMIN', 'USER']);

    if (!tokenExists || !id) throw 401;
    else if (new_password !== confirm_new_password) throw 400;

    const user_password = await Passwords.findById(id);

    if (!user_password) throw 404;
    else if (await compare(new_password, user_password.hash)) throw 409;

    user_password.hash = await hash(new_password, 10);
    await user_password.save();
    await PasswordTokens.deleteOne({ token });

    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Passwords do not match', code: 400 });
    } else if (err === 401) {
      res.status(401).json({ msg: 'Invalid token', code: 401 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else if (err === 409) {
      res.status(409).json({ msg: 'Cannot reuse same password', code: 409 });
    } else res.sendStatus(500);
  }
};

export {
  dashboard,
  updateUserDetails,
  updatePersonalDetails,
  resetUserPassword,
  forgotPassword
};
