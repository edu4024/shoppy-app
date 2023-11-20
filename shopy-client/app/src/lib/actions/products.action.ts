'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as Api from '@/app/src/api';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

export async function getProductList(
  my: boolean,
  query: string,
  page: number,
  limit?: number,
  filters?: [0, 0],
  quantity?: object) {
  const currentPage = (page - 1) * ITEMS_PER_PAGE;
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
