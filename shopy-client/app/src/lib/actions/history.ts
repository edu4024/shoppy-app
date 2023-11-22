'use server';
import * as Api from '@/app/src/api';

export async function getHistory() {
  return Api.history.getHistory();
}
