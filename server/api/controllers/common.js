import fs from 'fs';

const dashboardData = JSON.parse(
  fs.readFileSync('../../data/dashboard-data.json', 'utf8')
);

const dashboard = (req, res) => {
  res.status(200).json(dashboardData);
};

const updateUserDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const updatePersonalDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const resetUserPassword = (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line camelcase
  const { new_password, confirm_new_password } = req.body;
  console.log(new_password, confirm_new_password);
  // eslint-disable-next-line camelcase
  if (new_password !== confirm_new_password) {
    res.sendStatus(400);
  }
  res.status(200).json({ status: 'ok' });
};

export {
  dashboard,
  updateUserDetails,
  updatePersonalDetails,
  resetUserPassword
};
