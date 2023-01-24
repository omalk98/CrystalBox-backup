import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5555',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5555',
  `http://${process.env.VITE_DEV_NETWORK_IP}:3000`,
  `http://${process.env.VITE_DEV_NETWORK_IP}:5555`
];

// eslint-disable-next-line no-unused-vars
const originFilter = (og, cb) => {
  if (
    allowedOrigins.indexOf(og) !== -1 ||
    (process.env.VITE_DEV_NETWORK_IP && !og)
  ) {
    cb(null, true);
  } else {
    cb('Not allowed by CORS');
  }
};

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true
};

const Cors = cors(corsOptions);

export default Cors;
