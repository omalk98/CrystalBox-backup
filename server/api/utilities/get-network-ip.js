/* eslint-disable no-restricted-syntax */
import { networkInterfaces } from 'os';

export default function getNetworkIP() {
  const nets = networkInterfaces();
  const results = {};
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  const ip = Object.values(results);
  if (process.env.DEV) process.env.VITE_DEV_NETWORK_IP = ip;
  return ip;
}
