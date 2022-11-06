import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Router } from 'express';
import { Users, Passwords } from './models/index.js';

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
  const pass = JSON.parse(fs.readFileSync('./data/password-data.json', 'utf8'));

  let i;
  for (i = 0; i < user.length; i += 1) {
    // eslint-disable-next-line prefer-const
    let newID = uuid();
    user[i].security_details.id = newID;
    pass[i]._id = newID;
    let newDate = formatDate(user[i].server_details.date_joined);
    user[i].server_details.date_joined = newDate;

    newDate = formatDate(user[i].server_details.time_last_login);
    user[i].server_details.time_last_login = newDate;
    Users.create(user[i]);
    Passwords.create(pass[i]);
  }

  res.sendStatus(200);
});

export default populateDBRouter;
