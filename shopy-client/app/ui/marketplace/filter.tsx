'use client';
import {
  Card,
  Text,
  Group,
  NumberInput,
  Space,
  CloseButton
} from '@mantine/core';
import classes from '@/app/styles/marketplace/filter.module.css';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filter() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleFilter = useDebouncedCallback((e, func) => {
    func(e);
  }, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (+to >= +from && +to !== 0) {
      params.set('from', from);
      params.set('to', to);
      params.set('page', '1');
      replace(`${pathname}?${params}`);
    } else {
      params.delete('from');
      params.delete('to');
      params.set('page', '1');
      replace(`${pathname}?${params.toString()}`);
    }
  });
  return (
    <main className={classes.wrapper}>
      <Card withBorder radius="md" >
        <Group justify="space-between">
          <Text fw={700}>Filters</Text>
          <Group justify="flex-end" gap="xs">
            <Text size="xs" c="dimmed"> Reset All  </Text>
            <CloseButton
              size="sm"
              variant="transparent"
              onClick={() => {
                setFrom('');
                setTo('');
              }}
            />
          </Group>
        </Group>
        <Space h="md" />
        <Text fw={500}>Price</Text>
        <Group justify="center" gap="xs" grow>
          <NumberInput
            className={classes.input}
            radius="md"
            leftSection="From:"
            hideControls
            value={from}
            onChange={(e) => {
              handleFilter(e, setFrom);
            }}
          />
          <NumberInput
            className={classes.input}
            radius="md"
            leftSection="To:"
            hideControls
            value={to}
            onChange={(e) => {
              handleFilter(e, setTo);
            }}
            />
        </Group>
      </Card>
    </main>
  );
}
