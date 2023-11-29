'use client';
import { Container } from '@mantine/core';
import CartTableHead from '@/app/ui/cart/cartTableHead';
import CartTableBody from '@/app/ui/cart/cartTableBody';
import { Button, Group, Image, Paper, Table, Text } from '@mantine/core';
import Link from 'next/link';
import classes from '@/app/styles/cart/cart.module.css';
import { useCart } from '@/app/src/providers/CartProvider';
import { usePathname } from 'next/navigation';
import { ProductDto } from '@/app/src/dto/products.dto';

export default function CartTable ({ docs }: any) {
  const pathname = usePathname();
  const [cartState, updateCartState] = useCart();

  const deleteProduct = (_id: string) => {
    updateCartState(cartState.filter((item: ProductDto )=> item._id !== _id));
  };
  const addQuantity = (_id: string) => {
    const productsList = [...cartState];
    productsList.find(item => {
      if (item._id === _id) {
        if (item.desiredQuantity + 1 <= item.quantity) {
          item.desiredQuantity += 1;
          return item;
        }

      }
    });
    updateCartState(productsList);
  };

  const reduceQuantity = (_id: string) => {
    const productsList = [...cartState];
    productsList.find(item => {
      if (item._id === _id) {
        if (item.desiredQuantity - 1 > 0) {
          item.desiredQuantity -= 1;
          return item;
        }
      }
    });
    updateCartState(productsList);
  };
  return(
    <Container size="lg">
        {(docs.length)? (
          <Table horizontalSpacing="md" verticalSpacing="md" >
            <CartTableHead pathname={pathname}/>
            <CartTableBody
              pathname={pathname}
              products={docs}
              deleteProduct={deleteProduct}
              addQuantity={addQuantity}
              reduceQuantity={reduceQuantity}
            />
          </Table>
        ): (
          <Container px={0} size="30rem">
            <Paper radius="md" p="lg">
              <Group justify="center">
                <Image src="/Balloon_empty.png" alt="nothing yet" h={300} w={300}/>
                <Text size="lg" fw={700}>Oops there&apos;s nothing yet!</Text>
                <Text c="dimmed">You haven&apos;t made any purchases yet. <br/>
                  Lets go to the marketplace and make purchases.</Text>

                <Link className={classes.linkColor} href="/dashboard/marketplace">
                  <Button fullWidth radius="md" >
                    Go to Marketplace
                  </Button>
                </Link>
              </Group>
            </Paper>
          </Container>
        )}
    </Container>
  );
}
