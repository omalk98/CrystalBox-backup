import { v4 as v4uuid } from 'uuid';
import {
  detailedResponseUser,
  responseUserList,
  NoExtraUser_ID,
  NoExtraUserDetails_ID,
  gatewayValidation
} from '../services/index.js';
import { Users, UserDetails, Tag } from '../models/index.js';

const validateUserAccess = async (req, res) => {
  const { gateway_id } = req.headers;
  const { key, uuid } = req.params;
  try {
    if (!gateway_id) throw 500;
    if (!key || !uuid) throw 401;

    await gatewayValidation(gateway_id, key, uuid);
    res.sendStatus(200);
  } catch (err) {
    if (err === 401) res.sendStatus(401);
    else res.sendStatus(500);
  }
};

const getUserDetailsFromTag = async (req, res) => {
  const { key, uuid } = req.params;
  try {
    const tag = await Tag.findById(key);
    if (!tag || tag.uuid !== uuid) throw 401;
    const user = await Users.findById(tag.user_id, NoExtraUser_ID);
    if (!user) throw 401;
    const user_details = await UserDetails.findById(
      user._id,
      NoExtraUserDetails_ID
    );
    if (!user_details) throw 401;

    res.status(200).json(detailedResponseUser(user));
  } catch (err) {
    if (err === 401) res.sendStatus(401);
    else res.sendStatus(500);
  }
};

const getUserDetailsFromEmailOrUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const users = await Users.find(
      { $or: [{ email: `/${username}/` }, { username: `/${username}/` }] },
      NoExtraUser_ID
    );
    if (!users) throw 401;

    const user_list = responseUserList(users);

    res.status(200).json(user_list);
  } catch (err) {
    if (err === 401) res.sendStatus(401);
    else res.sendStatus(500);
  }
};

const createUserTag = async (req, res) => {
  const { user_id, key } = req.params;
  try {
    const new_uuid = v4uuid();

    const tag = Tag.findById(key);
    if (!tag) {
      await Tag.create({
        _id: key,
        uuid: new_uuid,
        user_id
      });
    } else {
      tag.uuid = new_uuid;
      tag.user_id = user_id;
      await tag.save();
    }

    res.status(201).json({ new_uuid });
  } catch (err) {
    if (err === 401) res.sendStatus(401);
    else res.sendStatus(500);
  }
};

const replaceUserTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('replaceUserTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

const removeUserTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('removeUserTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

export {
  validateUserAccess,
  getUserDetailsFromTag,
  getUserDetailsFromEmailOrUsername,
  createUserTag,
  replaceUserTag,
  removeUserTag
};
