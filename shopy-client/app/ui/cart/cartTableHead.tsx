'use client';
import { Table, Text } from '@mantine/core';

export default function CartTableHead ({ pathname }: { pathname: string }) {
  return(
    <Table.Thead>
      <Table.Tr>
        <Table.Th><Text c="dimmed">Item</Text></Table.Th>
        <Table.Th></Table.Th>
        <Table.Th w="150px"><Text c="dimmed">Unit Price</Text></Table.Th>
        {pathname.includes('history')? (
          <Table.Th w="200px"><Text c="dimmed">Date</Text></Table.Th>
        ): (
          <Table.Th w="200px"><Text c="dimmed">Quantity</Text></Table.Th>
        )
        }
      </Table.Tr>
    </Table.Thead>
  );
}
