'use server';
import axios from '@/app/src/lib/axios';
import { ProductDto, ProductResponseDto } from '@/app/src/dto/products.dto';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

export const getProductList = async (
  my: boolean,
  query: any,
  page: number,
  limit?: number,
  filters?: [0, 0],
  quantity?: object
): Promise<ProductResponseDto> => {
  const params: {
    my: boolean,
    skip: number,
    limit: number,
    $text?: object,
    price?: object,
    quantity?: object
  } = {
    my,
    skip: page,
    limit: limit || ITEMS_PER_PAGE
    };
  if (query.length) {
    params.$text = { $search: query };
  }
  if (filters && filters[0]) {
    const [from, to] = filters;
    params.price = { $gte :  from, $lte : to };
  }
  if (quantity) {
    params.quantity = { $gt: 0 };
  }
  return (await axios.get('/products', { params })).data;
};

export const createProduct = async (productData: FormData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
    return axios.post('/products', productData, config);
};

export const deleteProduct = async (_id: string) => {
  return (await axios.delete(`/products/${_id}`));
};

export const getProduct = async (_id: string): Promise<ProductDto> => {
  const [product] = (await axios.get(`/products/${_id}`)).data;
  return product;
};

export const updateProduct = async (_id: string, productData: FormData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  return axios.put(`/products/${_id}`, productData, config);
};

export const checkOut = async (productData: FormData) => {
  return axios.post('/products/checkout', productData);
};

export const getHistory = async () => {
  return (await axios.get('/history')).data;
};

