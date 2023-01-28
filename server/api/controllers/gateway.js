const validateUserAccess = (req, res) => {
  const { Gate_ID } = req.headers;
  const { key, uuid } = req.params;
  console.log('getUserDetails');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);

  // will be used in middleware
  console.log(`Gate_ID: ${Gate_ID}`);
  res.status(200).send('Hello from the gateway!');
};

const getUserDetails = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('getUserDetails');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
};

const createUserTag = async (req, res) => {
  const { key, uuid } = req.params;
  console.log('createUserTag');
  console.log(`key: ${key}`);
  console.log(`uuid: ${uuid}`);
  res.sendStatus(200);
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
  getUserDetails,
  createUserTag,
  replaceUserTag,
  removeUserTag
};
