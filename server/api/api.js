import { config } from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import { Cors, RequestLogger, ErrorLogger } from './middleware/index.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { uuid } from 'uuidv4';
config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const baseAPI = '/api/v1';
const contentAPI = `${baseAPI}/content`;
const dataAPI = `${baseAPI}/data`;

const app = express();

app.use(RequestLogger);
app.use(ErrorLogger);
app.use(Cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/dist')));

const data = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));
const dashboardData = JSON.parse(
  fs.readFileSync('./data/dashboard-data.json', 'utf8')
);
const analyticsData = JSON.parse(
  fs.readFileSync('./data/analytics-data.json', 'utf8')
);
const articles = JSON.parse(
  fs.readFileSync('./data/home-articles.json', 'utf8')
);
const footer = JSON.parse(
  fs.readFileSync('./data/creator-contact.json', 'utf8')
);

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

app.get(`${contentAPI}/home`, (req, res) => {
  res.status(200).json(articles);
});

app.get(`${contentAPI}/footer`, (req, res) => {
  res.status(200).json(footer);
});

app.get(`${dataAPI}/common/dashboard`, (req, res) => {
  res.status(200).json(dashboardData);
});

app.put(`${dataAPI}/common/user/update-user-details`, (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
});

app.put(`${dataAPI}/common/user/update-personal-details`, (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
});

app.put(`${dataAPI}/common/user/reset-password`, (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line camelcase
  const { new_password, confirm_new_password } = req.body;
  console.log(new_password, confirm_new_password);
  // eslint-disable-next-line camelcase
  if (new_password !== confirm_new_password) {
    res.sendStatus(400);
  }

  res.status(200).json({ status: 'ok' });
});

app.put(`${dataAPI}/admin/user/update-target-user-details`, (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
});

app.put(`${dataAPI}/admin/user/update-target-personal-details`, (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
});

app.put(`${dataAPI}/admin/user/reset-target-user-password`, (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
});

app.get(`${dataAPI}/admin/analytics`, (req, res) => {
  res.status(200).json(analyticsData);
});

app.get(`${dataAPI}/admin/all-users`, (req, res) => {
  const userMinInfo = data.map((user) => ({
    id: user?.security_details?.id,
    name: `${user?.user_details?.first_name} ${user?.user_details?.last_name}`,
    username: user?.user_details?.username,
    roles: user?.server_details?.roles,
    s_lvl: user?.security_details?.security_level,
    activated: user?.server_details?.status?.is_Activated ? 'Yes' : 'No',
    locked: user?.server_details?.status?.is_Locked ? 'Yes' : 'No',
    email: user?.user_details?.email
  }));
  res.status(200).json(userMinInfo);
});

app.get(`${dataAPI}/admin/user/:id`, (req, res) => {
  const { id } = req.params;
  const user = data.find((usr) => usr?.security_details?.id === id);
  if (!user) {
    res.status(404).json({ msg: 'User not found', code: 404 });
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
    },
    server_details: {
      isEditable: false,
      details: user?.server_details
    }
  };
  res.status(200).json(resUser);
});

app.put(`${dataAPI}/admin/activate-user-toggle/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
});

app.put(`${dataAPI}/admin/lock-user-toggle/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
});

app.delete(`${dataAPI}/admin/delete-user/:id`, (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
});

app.put(`${dataAPI}/admin/bulk-deactivate-users`, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.put(`${dataAPI}/admin/bulk-lock-users`, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.delete(`${dataAPI}/admin/bulk-delete-users`, (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.get('*', (req, res) => {
  res
    .setHeader('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

export default app;
