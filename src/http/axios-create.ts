import axios from 'axios';

import { BASE_URL } from '../utils/constants/path-url';

export const $apiBase = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  const newConfig = config;

  newConfig.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return newConfig;
});
