import { config } from 'dotenv';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import { Cors, RequestLogger, ErrorLogger } from './middleware/index.js';
import {
  adminRouter,
  contentRouter,
  commonRouter,
  publicRouter
} from './routes/index.js';

import populateDBRouter from './populate-db.js';

config();

const database = process.env.MONGO_URI;
connect(database, { useUnifiedTopology: true, useNewUrlParser: true }).catch(
  (err) => {
    throw new Error(err);
  }
);

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(RequestLogger);
app.use(ErrorLogger);
app.use(Cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, '../public/dist')));

app.use(adminRouter);
app.use(contentRouter);
app.use(commonRouter);
app.use(publicRouter);

app.use(populateDBRouter);

app.get('/user/forgot-password', (req, res) => {
  const { token } = req.query;
  if (!token) {
    res.redirect('/login');
    return;
  }
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(join(__dirname, '../public', 'forgot-password.html'));
});

app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(join(__dirname, '../public/dist', 'index.html'));
});

export default app;
