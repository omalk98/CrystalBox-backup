const validateUserAccess = (req, res) => {
  const { Gate_ID } = req.headers;
  const { id } = req.params;
  console.log(`Gateway ${Gate_ID} is up and running with user ${id}!`);
  if (!id || id !== '123') {
    res.status(400).send('Bad request');
    return;
  }
  res.status(200).send('Hello from the gateway!');
};

const getUserDetails = async (req, res) => {
  console.log('getUserDetails');
  res.sendStatus(200);
};

const createUserTag = async (req, res) => {
  console.log('createUserTag');
  res.sendStatus(200);
};

const replaceUserTag = async (req, res) => {
  console.log('replaceUserTag');
  res.sendStatus(200);
};

const removeUserTag = async (req, res) => {
  console.log('removeUserTag');
  res.sendStatus(200);
};

export {
  validateUserAccess,
  getUserDetails,
  createUserTag,
  replaceUserTag,
  removeUserTag
};
