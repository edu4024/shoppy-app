'use server';
import axios from '@/app/src/lib/axios';
import { ProductDto, ProductResponseDto } from '@/app/src/dto/products.dto';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

/*
* TODO:
*  Handle error
* */

export const getProductList = async (
  my: boolean,
  query: any,
  page: number,
  limit?: number,
  filters?: [0, 0],
  quantity?: object
): Promise<ProductResponseDto | undefined> => {
  try {
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
  } catch (err: any) {
    console.log(err.message);
  }

};

export const createProduct = async (productData: FormData) => {
  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    return axios.post('/products', productData, config);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (_id: string) => {
  try {
    return (await axios.delete(`/products/${_id}`));
  } catch (err) {
    console.log(err);
  }
};

export const getProduct = async (_id: string): Promise<ProductDto | undefined> => {
  try {
    const [product] = (await axios.get(`/products/${_id}`)).data;
    return product;
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = async (_id: string, productData: FormData) => {
  try {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    return axios.put(`/products/${_id}`, productData, config);
  } catch (err) {
    console.log(err);
  }
};

export const checkOut = async (productData: FormData) => {
  try {
    return axios.post('/products/checkout', productData);
  } catch (err) {
    console.log(err);
  }
};

export const getHistory = async () => {
  return (await axios.get('/history')).data;
};

