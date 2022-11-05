import fs from 'fs';

const analyticsData = JSON.parse(
  fs.readFileSync('./data/analytics-data.json', 'utf8')
);

const data = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));

const userDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const personalDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const resetUserPassword = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const adminAnalytics = (req, res) => {
  res.status(200).json(analyticsData);
};

const allUsers = (req, res) => {
  const userMinInfo = data.map((user) => ({
    id: user?.security_details?.id,
    name: `${user?.user_details?.first_name} ${user?.user_details?.last_name}`,
    username: user?.user_details?.username,
    roles: user?.server_details?.roles,
    s_lvl: user?.security_details?.security_level,
    activated: user?.server_details?.status?.activated ? 'Yes' : 'No',
    locked: user?.server_details?.status?.locked ? 'Yes' : 'No',
    email: user?.user_details?.email
  }));
  res.status(200).json(userMinInfo);
};

const userByID = (req, res) => {
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
};

const activateUserToggle = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const lockUserToggle = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkDeactivateUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkLockUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

const bulkDeleteUsers = (req, res) => {
  const { id } = req.params;
  console.log(id);
  res.sendStatus(200);
};

export {
  userDetails,
  personalDetails,
  resetUserPassword,
  adminAnalytics,
  allUsers,
  userByID,
  activateUserToggle,
  lockUserToggle,
  deleteUser,
  bulkDeactivateUsers,
  bulkLockUsers,
  bulkDeleteUsers
};
