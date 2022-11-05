import { config } from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { Cors, RequestLogger, ErrorLogger } from './middleware/index.js';

import adminRouter from './routes/admin.js';
import contentRouter from './routes/content.js';
import commonRouter from './routes/common.js';
import publicRouter from './routes/public.js';

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
