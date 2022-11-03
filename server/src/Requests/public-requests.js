import axios from './axios';
import httpType from './httpType';

const options = (url, method, payload = null, signal = null) => ({
  url,
  method,
  signal,
  data: JSON.stringify(payload)
});

async function sendRequest(url, method, payload, signal) {
  try {
    return axios(options(url, method, payload, signal));
  } catch {
    // eslint-disable-next-line no-alert
    alert('Server is not responding');
  }
  throw new Error('Server is not responding');
}

// Get Requests
// ============================================================

const homeArticles = (signal) =>
  sendRequest('/content/home', httpType.GET, null, signal);

const footerData = (signal) =>
  sendRequest('/content/footer', httpType.GET, null, signal);

const Get = {
  homeArticles,
  footerData
};

// ============================================================

// Post Requests
// ============================================================

const userLogin = (payload) => sendRequest('/login', httpType.POST, payload);

const Post = {
  userLogin
};

// ============================================================

const PublicRequests = {
  Get,
  Post
};

export default PublicRequests;
