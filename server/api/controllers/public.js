import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./data/user-data.json', 'utf8'));

const login = (req, res) => {
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
};

const logout = (req, res) => {
  console.log('logged out');
  res.clearCookie('token', { httpOnly: true });
  res.sendStatus(200);
};

const refreshToken = (req, res) => {
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
};

export { login, logout, refreshToken };
