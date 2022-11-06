import { config } from 'dotenv';
import express from 'express';
import path from 'path';
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

const database = process.env.MONGO_URI;
connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { uuid } from 'uuidv4';
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(RequestLogger);
app.use(ErrorLogger);
app.use(Cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/dist')));

app.use(adminRouter);
app.use(contentRouter);
app.use(commonRouter);
app.use(publicRouter);

app.get('*', (req, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

export default app;
