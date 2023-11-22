'use server';
import axios from '@/app/src/lib/axios';

export const getHistory = async () => {
  try {
    return (await axios.get('/history')).data;
  } catch (err) {
    console.log(err);
  }
};
