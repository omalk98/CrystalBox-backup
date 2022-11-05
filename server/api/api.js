import { config } from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { Cors, RequestLogger, ErrorLogger } from './middleware/index.js';

import adminRouter from './routes/admin.js';
import contentRouter from './routes/content.js';

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

const baseAPI = '/api/v1';

const data = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));

app.post(`${baseAPI}/login`, (req, res) => {
  const { username, password, rememberMe } = req.body;
  console.log(req.body);
  if (!username || !password || password === '123') {
    res.status(401).json({ msg: 'Invalid username or password', code: 401 });
    return;
  }
  const user = data.find(
    (usr) =>
      usr?.user_details?.email === username ||
      usr?.user_details?.username === username
  );
  if (!user) {
    res.status(401).json({ msg: 'Invalid username or password', code: 401 });
    return;
  }

  const resUser = {
    user_details: {
      isEditable: true,
      details: user?.user_details
    },
    security_details: {
      isEditable: false,
      details: user?.security_details
    },
    personal_details: {
      isEditable: true,
      details: user?.personal_details,
      user_image: user?.user_image
    }
  };
  if (rememberMe) {
    res.cookie('token', user?.security_details?.id, {
      httpOnly: true,
      path: '/',
      // remove none after development, uncomment secure and strict
      sameSite: 'none',
      // sameSite: 'strict',
      // secure: true,
      maxAge: 60 * 60 * 24 * 7 * 1000
    });
  } else res.clearCookie('token', { httpOnly: true });

  res.status(200).json({
    user: resUser,
    auth: {
      token: `${user?.security_details?.id}-12345`,
      roles: user?.server_details?.roles
    }
  });
});

app.get(`${baseAPI}/logout`, (req, res) => {
  console.log('logged out');
  res.clearCookie('token', { httpOnly: true });
  res.sendStatus(200);
});

app.get(`${baseAPI}/refresh-token`, (req, res) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
    return;
  }
  const user = data.find((usr) => usr?.security_details?.id === token);
  if (!user) {
    res.status(401).json({ msg: 'Invalid token', code: 401 });
    return;
  }
  const resUser = {
    user_details: {
      isEditable: true,
      details: user?.user_details
    },
    security_details: {
      isEditable: false,
      details: user?.security_details
    },
    personal_details: {
      isEditable: true,
      details: user?.personal_details,
      user_image: user?.user_image
    }
  };
  res.status(200).json({
    user: resUser,
    auth: {
      token: `${user?.security_details?.id}-12345`,
      roles: user?.server_details?.roles
    }
  });
});

app.get('*', (req, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

export default app;
