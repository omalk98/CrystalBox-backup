import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { Users, UserDetails, Passwords, Gateway } from '../models/index.js';
import { formatDate } from '../utilities/index.js';

const populateDB = (req, res) => {
  const user = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));
  const { users, user_details } = user;

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

export default populateDB;
