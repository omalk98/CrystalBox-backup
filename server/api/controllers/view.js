import { join } from 'path';
import { __dirname } from '../utilities/index.js';

const mainPage = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(join(__dirname, 'public/dist', 'index.html'));
};

const forgotPassword = (req, res) => {
  const { id } = req.params;
  const { token } = req.query;
  if (!token || !id) {
    res.redirect('/login');
    return;
  }
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(join(__dirname, 'public', 'forgot-password.html'));
};

export { mainPage, forgotPassword };
