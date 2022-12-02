import cors from 'cors';

// prettier-ignore
const allowedOrigins = process.env.VITE_DEV_NETWORK_IP
  ? [
    'http://localhost:3000',
    'http://localhost:5555',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5555',
    `http://${process.env.VITE_DEV_NETWORK_IP}:3000`,
    `http://${process.env.VITE_DEV_NETWORK_IP}:5555`
  ]
  : [`https://${process.env.SERVER_ADDRESS}`];

// prettier-ignore
const corsOptions = {
<<<<<<< Updated upstream
  origin: process.env.SERVER_ADDRESS
    ? (og, cb) => {
      if (
        allowedOrigins.indexOf(og) !== -1 ||
        (process.env.VITE_DEV_NETWORK_IP && !og)
      ) {
        cb(null, true);
      } else {
        cb('Not allowed by CORS');
      }
=======
  origin: (og, cb) => {
    if (
      allowedOrigins.indexOf(og) !== -1 ||
      (process.env.VITE_DEV_NETWORK_IP && !og)
    ) {
      console.log('CORS: ', og);
      cb(null, true);
    } else {
      cb('Not allowed by CORS');
>>>>>>> Stashed changes
    }
    : '*',
  optionsSuccessStatus: 200,
  credentials: true
};

const Cors = cors(corsOptions);
export default Cors;
