import {
  responseUserList,
  detailedResponseUser,
  NoExtraUser_ID,
  NoExtraUserDetails_ID,
  GatewayAccess_Lookup,
  Analytics_Lookup,
  databaseUserResponse,
  sendMail,
  generatePasswordToken,
  parseGatewayData,
  parseAnalyticsData
} from '../services/index.js';
import {
  Users,
  UserDetails,
  Passwords,
  GatewayAccess
} from '../models/index.js';

const userDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const personalDetails = (req, res) => {
  console.log(req.body);
  res.status(200).json({ status: 'ok' });
};

const graphData = async (req, res) => {
  const current_date = new Date();
  const day = current_date.getDay();

  current_date.setHours(0, 0, 0, 0);
  const today = new Date(current_date);

  current_date.setDate(current_date.getDate() - day);
  const last_week = new Date(current_date);

  current_date.setDate(current_date.getDate() + day);
  current_date.setMonth(0, 1);
  const last_year = new Date(current_date);

  try {
    const daily = await GatewayAccess.aggregate(
      Analytics_Lookup(today, 'daily')
    ).sort({ '_id.gateway': 1 });
    const weekly = await GatewayAccess.aggregate(
      Analytics_Lookup(last_week, 'weekly')
    ).sort({ '_id.access_date': 1, '_id.gateway': 1 });
    const annual = await GatewayAccess.aggregate(
      Analytics_Lookup(last_year, 'annual')
    ).sort({ '_id.access_date': 1, '_id.gateway': 1 });

    const analyticsData = await parseAnalyticsData(daily, weekly, annual);

    res.status(200).json(analyticsData);
  } catch (err) {
    res.sendStatus(500);
  }
};

const recordData = async (req, res) => {
  try {
    const rawGatewayInfo = await GatewayAccess.aggregate(
      GatewayAccess_Lookup
    ).sort({
      access_date: -1
    });
    const gatewayInfo = parseGatewayData(rawGatewayInfo);
    res.status(200).json(gatewayInfo);
  } catch (err) {
    res.sendStatus(500);
  }
};

const allUsers = async (req, res) => {
  try {
    const userMinInfo = await Users.find(
      {
        $or: [
          { 'status.deleted': { $exists: false } },
          { 'status.deleted': false }
        ]
      },
      { ...NoExtraUser_ID }
    );
    res.status(200).json(responseUserList(userMinInfo));
  } catch (err) {
    res.sendStatus(500);
  }
};

const userByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id, NoExtraUser_ID);
    const user_details = await UserDetails.findById(id, NoExtraUserDetails_ID);
    if (!user || !user_details) throw 404;
    const resUser = detailedResponseUser(user, user_details);
    res.status(200).json(resUser);
  } catch (err) {
    if (err === 404) {
      res.status(404).json({ message: 'User not found' });
    } else res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const { user, user_details, password } = await databaseUserResponse(
      newUser
    );

    if (!user || !user_details) throw 400;

    const existsUsernameOrEmail = await Users.findOne({
      $or: [
        { _id: user._id },
        { username: user.username },
        { email: user.email }
      ]
    });
    const existsPhone = await UserDetails.findOne({ phone: user.phone });

    if (existsUsernameOrEmail || existsPhone) throw 409;

    await Users.create(user);
    await UserDetails.create(user_details);
    await Passwords.create(password);

    const resetLink = await generatePasswordToken(user._id, true);
    const forgotPasswordLink = `http${
      process.env.VITE_DEV_NETWORK_IP ? '' : 's'
    }://${process.env.VITE_DEV_NETWORK_IP || process.env.SERVER_ADDRESS}${
      process.env.VITE_DEV_NETWORK_IP ? `:${process.env.PORT}` : ''
    }/forgot-password`;

    sendMail({
      to: user.email,
      subject: 'CrystalBox - Account Created',
      html: `
      <div>
        <h1 style="background: #808080; color: #fff;">Account Setup</h1>
        <p>Welcome to CrystalBox, ${user_details.first_name} ${user_details.last_name}!</p>
        Your Username is: ${user.username}
        This can be changed at any time in your profile settings.
        <br />
        The link will expire in <strong>24 hours</strong>.
        <p>Click <a href="${resetLink}" target="_blank">here</a> to setup your password and activate your account.</p>
        <p>Or copy and paste this link into your browser:</p>
        <br />
        <p>${resetLink}</p>
        <br />
        <p>If the link is not working or has expired, you will need to use the <a href="${forgotPasswordLink}">forgot password</a> link and provide your email to reset your password.</p>
      </div>
      `
    });

    res.sendStatus(201);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Invalid data', code: 400 });
    } else if (err === 409) {
      res.status(409).json({ msg: 'Username already exists', code: 409 });
    } else res.sendStatus(500);
  }
};

const toggleStatus = async (id, status) => {
  const user = await Users.findById(id);
  if (!user) throw 404;

  user.status[status] = !user.status[status];
  await user.save();
};

const activateUserToggle = async (req, res) => {
  const { id } = req.params;
  try {
    await toggleStatus(id, 'activated');
    res.sendStatus(200);
  } catch (err) {
    if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

const lockUserToggle = async (req, res) => {
  const { id } = req.params;
  try {
    await toggleStatus(id, 'locked');
    res.sendStatus(200);
  } catch (err) {
    if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await toggleStatus(id, 'deleted');
    res.sendStatus(200);
  } catch (err) {
    if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

const bulkToggleStatus = async (ids, status, state = false) => {
  if (!ids || !(ids instanceof Array)) throw 400;
  ids.forEach(async (id) => {
    const user = await Users.findById(id);
    if (!user) throw 404;
    user.status[status] = state;
    await user.save();
  });
};

const bulkDeactivateUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    await bulkToggleStatus(ids, 'activated');
    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Invalid data', code: 400 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

const bulkLockUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    await bulkToggleStatus(ids, 'locked', true);
    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Invalid data', code: 400 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

const bulkDeleteUsers = async (req, res) => {
  const { ids } = req.body;
  try {
    await bulkToggleStatus(ids, 'deleted', true);
    res.sendStatus(200);
  } catch (err) {
    if (err === 400) {
      res.status(400).json({ msg: 'Invalid data', code: 400 });
    } else if (err === 404) {
      res.status(404).json({ msg: 'User not found', code: 404 });
    } else res.sendStatus(500);
  }
};

export {
  userDetails,
  personalDetails,
  graphData,
  recordData,
  allUsers,
  userByID,
  createUser,
  activateUserToggle,
  lockUserToggle,
  deleteUser,
  bulkDeactivateUsers,
  bulkLockUsers,
  bulkDeleteUsers
};
