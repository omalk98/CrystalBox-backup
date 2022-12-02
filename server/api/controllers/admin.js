import fs from 'fs';
import {
  responseUserList,
  detailedResponseUser,
  NoExtraUser_ID,
  NoExtraUserDetails_ID
} from '../common/index.js';
import { Users, UserDetails } from '../models/index.js';

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

const adminAnalytics = (req, res) => {
  res.status(200).json(analyticsData);
};

const allUsers = async (req, res) => {
  try {
    const userMinInfo = await Users.find({}, { ...NoExtraUser_ID });
    res.status(200).json(responseUserList(userMinInfo));
  } catch (err) {
    throw new Error(err);
  }
};

const userByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id, NoExtraUser_ID);
    const user_details = await UserDetails.findById(id, NoExtraUserDetails_ID);
    if (!user || !user_details) throw 404;
    const resUser = detailedResponseUser(user, user_details);
    res.status(200).json(resUser);
  } catch (err) {
    if (err === 404) {
      res.status(404).json({ message: 'User not found' });
    }
    res.sendStatus(500);
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
