'use client';
import { CloseButton, Group, Image, Table, Text } from '@mantine/core';
import moment from 'moment';
import { CartDto } from '@/app/src/dto/cart.dto';
import React from 'react';

export default function CartTableBody( props: {
  pathname: string
  products: CartDto[],
  deleteProduct: (_id: string) => void,
  addQuantity: (_id: string) => void,
  reduceQuantity: (_id: string) => void
}
): React.JSX.Element {
  enum Currency {
    USD = '$',
    EUR = '\u20AC'
  }
  const rows = props.products.map((
    {
      name,
      price,
      currency,
      imageUrl = '/Product.png',
      _id,
      date,
      desiredQuantity
    }
  ) => {
    return (
    <Table.Tr key={_id}>
      <Table.Td><Image src={imageUrl} alt={name} height={100} w={100} radius="md" /></Table.Td>
      <Table.Td width="270px"><Text size="lg" fw={700}>{name}</Text></Table.Td>
      <Table.Td><Text size="lg">{Currency[currency]} {price}</Text></Table.Td>
      <Table.Td>
        {props.pathname.includes('history')? (
          <Text size="lg">{moment(date).format('D.M.Y')}</Text>
        ): (
          <Group>
            <Image
              src="/Minus.svg"
              alt="decrease quantity"
              h={32}
              w={32}
              onClick={() => props.reduceQuantity(_id)}
            />
            <Text>
              {desiredQuantity}
            </Text>
            <Image
              src="/Plus.svg"
              alt="increase quantity"
              h={32}
              w={32}
              onClick={() => props.addQuantity(_id)}
            />
          </Group>
        )}

      </Table.Td>
      <Table.Td>
        {!props.pathname.includes('history') &&
          <Group>
            <CloseButton onClick={() => props.deleteProduct(_id) }/>
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
    <Table.Tbody>
      {rows}
    </Table.Tbody>
  );
}
