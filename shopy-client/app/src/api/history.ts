'use server';
import axios from '@/app/src/lib/axios';

export const getHistory = async () => {
  return (await axios.get('/history')).data;
};
