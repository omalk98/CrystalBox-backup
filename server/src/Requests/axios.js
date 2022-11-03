import axios from 'axios';

const baseUrl = `${
  import.meta.env.DEV
    ? `http://${import.meta.env.VITE_DEV_NETWORK_IP}:5000`
    : ''
}/api/v1`;

export default axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    type: 'cors'
  }
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    type: 'cors'
  },
  withCredentials: true
});
