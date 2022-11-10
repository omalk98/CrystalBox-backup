import fs from 'fs';
import { responseUserList } from '../common/index.js';
import { Users } from '../models/index.js';

const analyticsData = JSON.parse(
  fs.readFileSync('./data/analytics-data.json', 'utf8')
);

const userDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const personalDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const resetUserPassword = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const adminAnalytics = (req, res) => {
  res.status(200).json(analyticsData);
};

const allUsers = async (req, res) => {
  try {
    const userMinInfo = await Users.find(
      {},
      { _id: 0, user_details: 1, security_details: 1, server_details: 1 }
    );
    res.status(200).json(responseUserList(userMinInfo));
  } catch (err) {
    throw new Error(err);
  }
};

const userByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ 'security_details.id': id });
    if (!user) {
      res.status(404).json({ msg: 'User not found', code: 404 });
      return;
    }
    const resUser = {
      user_details: {
        isEditable: true,
        details: user.user_details
      },
      security_details: {
        isEditable: false,
        details: user.security_details
      },
      personal_details: {
        isEditable: true,
        details: user.personal_details,
        user_image: user.user_image
      },
      server_details: {
        isEditable: false,
        details: user.server_details
      }
    };
    res.status(200).json(resUser);
  } catch (err) {
    throw new Error(err);
  }
};

const createUser = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const activateUserToggle = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const lockUserToggle = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkDeactivateUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkLockUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkDeleteUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

export {
  userDetails,
  personalDetails,
  resetUserPassword,
  adminAnalytics,
  allUsers,
  userByID,
  createUser,
  activateUserToggle,
  lockUserToggle,
  deleteUser,
  bulkDeactivateUsers,
  bulkLockUsers,
  bulkDeleteUsers
};
