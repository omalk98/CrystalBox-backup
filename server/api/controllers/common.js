import fs from 'fs';
import { compare, hash } from 'bcrypt';
import { Passwords, AccessTokens } from '../models/index.js';
import { verifyAccessToken } from '../common/index.js';

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

const resetUserPassword = (req, res) => {
  console.log(req.body);
  const { new_password, confirm_new_password } = req.body;
  if (new_password !== confirm_new_password) res.sendStatus(400);
  res.status(200).json({ status: 'ok' });
};

const resetPassword = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    const { token } = req.query;
    const tokenExists = await AccessTokens.findOne({ token });
    const id = verifyAccessToken(token, ['ADMIN', 'USER']);

    if (!tokenExists || !id) throw 401;
    else if (password !== confirm_password) throw 409;

    const user_password = await Passwords.findById(id);

    if (!user_password) throw 404;
    else if (compare(password, user_password.hash)) throw 400;

    user_password.hash = await hash(password, 10);
    await user_password.save();
    await AccessTokens.deleteOne({ token });

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
  resetPassword
};
