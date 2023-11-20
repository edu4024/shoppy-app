'use client';
import { Grid } from '@mantine/core';
import ProductCard from '@/app/ui/marketplace/productCard';
import { ProductDto } from '@/app/src/dto/products.dto';

export default function ProductList({ products }: [ProductDto]) {
  return (
    <Grid>
      {products.map((product: ProductDto) => (
        <Grid.Col span={{ base: 1, xs: 4 }} key={product._id}><ProductCard product={product}/></Grid.Col>
      ))}
    </Grid>
  );
}
