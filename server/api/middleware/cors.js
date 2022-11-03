import { config } from 'dotenv';
import cors from 'cors';

config();

// dev origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  `http://${process.env.VITE_DEV_NETWORK_IP}:3000`,
  `http://${process.env.VITE_DEV_NETWORK_IP}:5000`
];
const corsOptions = {
  origin: (og, cb) => {
    // Remove || !og after development
    if (allowedOrigins.indexOf(og) !== -1 || !og) {
      cb(null, true);
    } else {
      cb('Not allowed by CORS');
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

const Cors = cors(corsOptions);
export default Cors;
