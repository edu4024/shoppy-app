import { ProductDto } from '@/app/src/dto/products.dto';

export interface CartDto extends ProductDto{
  date: string;
  desiredQuantity: number;
}
