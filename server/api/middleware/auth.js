import { PasswordTokens } from '../models/index.js';
import { verifyPasswordToken } from '../services/index.js';

const validatePasswordLink = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.query;
    if (!token || !id) {
      res.redirect('/login');
      return;
    }
    const tokenExists = await PasswordTokens.findOne({ token });
    const user_id = await verifyPasswordToken(id, token);
    if (!tokenExists || !user_id) res.redirect('/user/forgot-password');
    else next();
  } catch {
    res.sendStatus(500);
  }
};

const validateAdmin = async (req, res, next) => {
  next();
  // to be implemented
};

const validateUser = async (req, res, next) => {
  next();
  // to be implemented
};

export { validatePasswordLink, validateAdmin, validateUser };
