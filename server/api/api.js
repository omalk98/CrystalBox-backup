import { config } from 'dotenv';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import { connect } from 'mongoose';
import {
  Cors,
  RequestLogger,
  ErrorLogger,
  ForceSSL
} from './middleware/index.js';
import {
  adminRouter,
  contentRouter,
  commonRouter,
  publicRouter,
  viewRouter,
  populateDBRouter
} from './routes/index.js';
import { __dirname } from './utilities/index.js';

config();

const database = process.env.MONGO_URI;
connect(database, { useUnifiedTopology: true, useNewUrlParser: true }).catch(
  (err) => {
    throw new Error(err);
  }
);

const app = express();

app.use(RequestLogger);
app.use(ErrorLogger);
if (process.env.VITE_DEV_NETWORK_IP) app.use(Cors);
else app.use(ForceSSL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public/dist')));

app.use(adminRouter);
app.use(contentRouter);
app.use(commonRouter);
app.use(publicRouter);
app.use(viewRouter);

app.use(populateDBRouter);

export default app;
