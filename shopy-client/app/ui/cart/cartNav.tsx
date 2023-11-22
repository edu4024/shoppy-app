'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import classes from '@/app/styles/cart/cart.module.css';
import { Group, Container, Flex } from '@mantine/core';

export default function CartNav () {
  const pathname = usePathname();
  const links = [
    { link: '/dashboard/cart', label: 'My Cart' },
    { link: '/dashboard/cart/history', label: 'History' }
  ];
  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={clsx(classes.link, {
        [classes.active]: pathname === link.link
      })}
    >
      {link.label}
    </Link>
  ));
  return(
    <Container size="lg">
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="nowrap"
      >
        <Group>
          {items}
        </Group>
      </Flex>
    </Container>

  );
}
