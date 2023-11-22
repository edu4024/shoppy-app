'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { signOut } from '@/auth';

axios.defaults.baseURL = process.env.API_URL;

axios.interceptors.request.use((config) => {
  const token = cookies().get('_token')?.value;

  config.headers.Authorization = 'Bearer ' + token;
  return config;
});

axios.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  if (error.response.status === 401) {
    await signOut({ redirectTo: '/login' });
  }
  return error;
});

export default axios;
