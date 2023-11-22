'use client';
import { Container } from '@mantine/core';
import { useCart } from '@/app/src/providers/CartProvider';
import CartTable from '@/app/ui/cart/cartTable';

export default function CartList ({ docs }: any) {
  const [cart] = useCart();
  const setData = () => {
    if (docs?.length) {
      return docs.reduce((acc, item) => [...acc, ...item.products], []);
    }
    if (cart?.length) {
      return cart.reduce((acc: any, val) => {
        if (val?.product) {
          const product = {...val.product};
          product.quantity = 1;
          return [...acc, product];
        }
      }, []);
    }
    return [];
  };
  const products = setData();
  return(
    <Container size="lg">
      <CartTable products={products}/>
    </Container>
  );
}
