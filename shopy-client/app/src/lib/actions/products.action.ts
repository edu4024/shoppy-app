'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as Api from '@/app/src/api';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

const getCurrentPage = (my: boolean, page: number) => {
  if (my && page > 1) {
    return (page - 1) * (ITEMS_PER_PAGE - 1);
  }
  return (page - 1) * ITEMS_PER_PAGE;
};

export async function getProductList(
  my: boolean,
  query: string,
  page: number,
  limit?: number,
  filters?: [0, 0],
  quantity?: object) {
  const currentPage = getCurrentPage(my, page);
  return Api.products.getProductList(my, query, currentPage, limit, filters, quantity);
}

export async function createProduct(formData: FormData) {
  await Api.products.createProduct(formData);
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string) {
  await Api.products.deleteProduct(id);
  revalidatePath('/dashboard/products');
}

export async function getProduct(id: string) {
  return Api.products.getProduct(id);
}

export async function updateProduct(id: string, formData: FormData) {
  await Api.products.updateProduct(id, formData);
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function checkOut(formData) {
  await Api.products.checkOut(formData);
  revalidatePath('/dashboard/cart/history');
  redirect('/dashboard/cart/history');
}
