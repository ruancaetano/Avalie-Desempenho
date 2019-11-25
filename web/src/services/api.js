import axios from 'axios';

import authConfig from '../config/auth';

export const getToken = () => localStorage.getItem(authConfig.TOKEN_KEY);

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

function hasProperty(obj, property) {
  if (!obj) return false;
  return Object.keys(obj).includes(property);
}

function errorResponseHandler(error) {
  const defaultMessage =
    'Ops, Encontramos um problema e já estamos resolvendo!';
  // check for errorHandle config
  if (
    error.config &&
    hasProperty(error.config, 'errorHandle') &&
    error.config.errorHandle === false
  ) {
    return Promise.reject(error);
  }

  // if has response show the error
  if (error.response) {
    return Promise.reject(error.response.data.message || defaultMessage);
  }

  return Promise.reject(defaultMessage);
}

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => response, errorResponseHandler);

export default api;
