'use client';
import { ProductDto } from '@/app/src/dto/products.dto';
import {
  Group,
  Image,
  Text,
  Table,
  CloseButton,
  Container,
  Paper,
  Button
} from '@mantine/core';
import { useCart } from '@/app/src/providers/CartProvider';
import moment from 'moment';
import Link from 'next/link';
import classes from '@/app/styles/cart/cart.module.css';

enum Currency {
  USD = '$',
  EUR = '\u20AC'
}
/*
* TODO:
*  fix quantity bug
*  fix display section
*
* */
export default function CartTable ({ products }: ProductDto[]) {
  const [cartState, updateCartState] = useCart();

  const deleteProduct = (id: string) => {
    updateCartState(cartState.filter(item => item.product._id !== id));
  };

  const rows = products.map((product) => {
    const {
      name,
      price,
      currency,
      imageUrl = '/Product.png',
      _id,
      quantity,
      date
    } = product;
    return (
      <Table.Tr key={_id}>
        <Table.Td><Image src={imageUrl} alt={name} height={100} /></Table.Td>
        <Table.Td width="270px"><Text size="lg" fw={700}>{name}</Text></Table.Td>
        <Table.Td><Text size="lg">{Currency[currency]} {price}</Text></Table.Td>
        <Table.Td>
          {cartState.length? (
            <Group>
              <Image
                src="/Minus.svg"
                alt="decrease quantity"
                h={32}
                w={32}
                onClick={() => {}}
              />
              <Text>
                {quantity}
              </Text>
              <Image
                src="/Plus.svg"
                alt="increase quantity"
                h={32}
                w={32}
                onClick={() => {}}
              />
            </Group>
          ): (
            <Text size="lg">{moment(date).format('D.M.Y')}</Text>
          )}

        </Table.Td>
        <Table.Td>
          {cartState.length > 0 &&
            <Group>
              <CloseButton onClick={() => deleteProduct(_id)}/>
              <Text c="dimmed">
                Remove
              </Text>
            </Group>
          }
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <main>
      {(cartState.length || products.length)? (
        <Table horizontalSpacing="md" verticalSpacing="md" >
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Text c="dimmed">Item</Text></Table.Th>
              <Table.Th></Table.Th>
              <Table.Th w="150px"><Text c="dimmed">Unit Price</Text></Table.Th>
              {cartState.length? (
                <Table.Th w="200px"><Text c="dimmed">Quantity</Text></Table.Th>
              ): (
                <Table.Th w="200px"><Text c="dimmed">Date</Text></Table.Th>
              )
              }
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      ): (
        <Container px={0} size="30rem">
          <Paper radius="md" p="lg">
            <Group justify="center">
              <Image src="/Balloon_empty.png" alt="nothing yet" h={300} w={300}/>
              <Text size="lg" fw={700}>Oops there's nothing yet!</Text>
              <Text c="dimmed">You haven't made any purchases yet. <br/>
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
    </main>
  );
}
