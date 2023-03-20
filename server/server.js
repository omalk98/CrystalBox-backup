import app from './api/api.js';
import { getNetworkIP } from './api/utilities/index.js';

const PORT = process.env.PORT || 5555;
const network_ip = process.env.VITE_DEV_NETWORK_IP || getNetworkIP();

const local_string = `http://localhost:${PORT}`;
const network_string = `http://${network_ip}:${PORT}`;

app.listen(PORT, () =>
  console.log('Server started on:\n', local_string, '\n', network_string)
);
