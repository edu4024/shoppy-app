'use client';
import { Card, Grid, Group, Image, Text, Center } from '@mantine/core';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import ProductCard from '@/app/ui/products/productCard';
import { ProductDto } from '@/app/src/dto/products.dto';
import classes from '@/app/styles/product/card.module.css';

export default function ProductList({ products }: [ProductDto]) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const page = params.get('page');
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 4 }} className={clsx( {
       [classes.hidden]: Number(page) > 1
      })}>
        <Card withBorder shadow="sm" padding="lg" radius="md" h="300">
          <Center h="300">
           <Group>
             <Link
               href={`/dashboard/products/${1}`}
               className={classes.link}
             >
               <Image src="/Plus.svg" alt="add product" h={50} w={50} />
               <Text fw={700}>New Product</Text>
             </Link>
           </Group>
          </Center>
        </Card>
      </Grid.Col>

      {products.map((product: ProductDto) => (
        <Grid.Col span={{ base: 1, xs: 4 }} key={product._id}><ProductCard product={product}/></Grid.Col>
      ))}
    </Grid>
  );
}
