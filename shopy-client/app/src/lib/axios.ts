import axios from 'axios';
import { cookies } from 'next/headers';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use((config) => {
  const token = cookies().get('_token')?.value;

  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

export default axios;
