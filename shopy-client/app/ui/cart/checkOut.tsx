'use client';
import { useCart } from '@/app/src/providers/CartProvider';
import {
  Paper,
  Text,
  Group,
  Space,
  Button,
  Container,
  Divider
} from '@mantine/core';
import classes from '@/app/styles/cart/checkout.module.css';
import { checkOut } from '@/app/src/lib/actions/products.action';

export default function CheckOut() {
  const [cart, setCart] = useCart();
  const price = cart.reduce((acc: number, item: any) => {
    return acc += item?.price * item?.desiredQuantity;
  }, 0);
  const submit = () => {
    const formData = cart.reduce((acc: any, val: any) => {
      if (val) return [...acc, val];
    }, []);
    checkOut(formData);
    setCart([]);
  };
  return (
    <main>
      {cart.length > 0 &&
        <Container className={classes.wrapper}>
          <Paper shadow="xs" radius="lg" withBorder p="xs">
            <Group>
              <Text size="lg" fw={700}> Summary </Text>
            </Group>
            <Space h="lg"/>
            <Divider/>
            <Space h="lg"/>
            <Group justify="space-between" gap="xl">
              <Text c="dimmed"> Total price </Text>
              <Text fw={700}> $ {price} </Text>
            </Group>
            <Space h="lg"/>
            <Group justify="center">
              <Button fullWidth radius="md" mt="md" onClick={submit}>Proceed to Checkout</Button>
            </Group>
          </Paper>
        </Container>
      }
    </main>

  );
}
