import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { Router } from 'express';
import { Users, UserDetails, Passwords } from './models/index.js';

const populateDBRouter = Router();

export const formatDate = (date, dateDelimiter = '-', timeDelimiter = ':') => {
  if (!date) return '';
  const hasTime = date.includes('T');
  let newDate = date;
  let time = '';
  let timeSlots = [];
  if (hasTime) {
    const parts = date.split('T');
    [newDate, time] = parts;
  }
  const dateSlots = newDate.split(dateDelimiter);
  timeSlots = time.split(timeDelimiter);
  const seconds = timeSlots.pop().split('.')[0];
  timeSlots.push(seconds);
  dateSlots[1] = parseInt(dateSlots[1], 10) - 1;

  return new Date(...dateSlots, ...timeSlots);
};

populateDBRouter.get('/populate-db', (req, res) => {
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
      console.clear();
      console.log(`${i / 20}% done`);
    }
  }

  res.sendStatus(200);
});

export default populateDBRouter;
