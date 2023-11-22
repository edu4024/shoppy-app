import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use((config) => {
  const token = cookies().get('_token')?.value;

  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    redirect('/login');
  }
  return error;
});

export default axios;
