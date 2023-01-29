const validateUserAccess = (req, res) => {
  const { gateway_id } = req.headers;
  const { key, uuid } = req.params;
  console.log(req.headers);
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  // will be used in middleware
  console.log(`Gate_ID: ${gateway_id}`);

  if (uuid !== '123') {
    setTimeout(() => {
      res.status(401).send('Unauthorized');
    }, 2000);
    return;
  }

  res.status(200).send('Hello from the gateway!');
};

const getUserDetailsFromTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('getUserDetailsFromTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

const getUserDetailsFromEmailOrUsername = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('getUserDetailsFromEmailOrUsername');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

const createUserTag = async (req, res) => {
  const { user_id, key } = req.params;
  console.log(`key: ${key}`);
  console.log(`uuid: ${user_id}`);
  res.status(201).json({ new_uuid: '123' });
};

const replaceUserTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('replaceUserTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

const removeUserTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('removeUserTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

export {
  validateUserAccess,
  getUserDetailsFromTag,
  getUserDetailsFromEmailOrUsername,
  createUserTag,
  replaceUserTag,
  removeUserTag
};
