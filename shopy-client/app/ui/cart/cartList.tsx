'use client';
import { Container } from '@mantine/core';
import CartTable from '@/app/ui/cart/cartTable';

export default function CartList ({ docs }: any) {
  return(
    <Container size="lg">
      <CartTable products={docs}/>
    </Container>
  );
}
