import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { faker } from '@faker-js/faker';
import {
  Users,
  UserDetails,
  Passwords,
  Gateway,
  GatewayAccess
} from '../models/index.js';
import { formatDate } from '../utilities/index.js';

const createGateways = (req, res) => {
  Gateway.create({
    _id: 'OMALK98',
    name: 'ThornHill Gateway',
    location: 'ThornHill, ON, CA',
    permissions: ['ADMIN']
  });

  Gateway.create({
    _id: 'SDTHK96',
    name: 'Vaughn Gateway',
    location: 'Vaughn, ON, CA',
    permissions: ['USER']
  });

  Gateway.create({
    _id: 'PHILI95',
    name: 'Scarborough Gateway',
    location: 'Scarborough, ON, CA',
    permissions: ['ADMIN', 'USER']
  });

  res.sendStatus(200);
};

const populateUsers = (req, res) => {
  const user = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));
  const { users, user_details } = user;

  let i;
  for (i = 0; i < users.length; i += 1) {
    const newID = uuid();
    users[i]._id = newID;
    user_details[i]._id = newID;
    let newDate = formatDate(users[i].date_joined);
    users[i].date_joined = newDate;

    newDate = formatDate(users[i].last_login.time);
    users[i].last_login.time = newDate;
    Users.create(users[i]);
    UserDetails.create(user_details[i]);
    Passwords.create({ _id: newID, hash: hashSync('12345', 10) });
    if (i % 20 === 0) {
      // eslint-disable-next-line no-console
      console.clear();
      // eslint-disable-next-line no-console
      console.log(`(${i}/${users.length}) -> ${i / 20}% done`);
    }
  }

  res.sendStatus(200);
};

const populateAccessRecords = async (req, res) => {
  const now = new Date();
  let i;
  for (i = 0; i < 10000; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const user = await Users.aggregate([{ $sample: { size: 1 } }]);
    const accessRecord = {
      user_id: user[0]._id,
      gateway: ['OMALK98', 'SDTHK96', 'PHILI95'][faker.random.numeric(1) % 3],
      key: faker.random.numeric(12),
      access_date: faker.date.between(
        '2022-01-01T00:00:00.000Z',
        now.toISOString()
      ),
      uuid: uuid(),
      code: 200,
      description: 'Access Granted'
    };
    GatewayAccess.create(accessRecord);
    if (i % 20 === 0) {
      // eslint-disable-next-line no-console
      console.clear();
      // eslint-disable-next-line no-console
      console.log(`(${i}/10000) -> ${i / 100}% done`);
    }
  }

  res.sendStatus(200);
};

export { createGateways, populateUsers, populateAccessRecords };
