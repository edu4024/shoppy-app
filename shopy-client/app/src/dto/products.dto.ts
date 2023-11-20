export interface ProductDto {
  _id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  userId: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponseDto {
  docs: [ProductDto],
  count: number
}
