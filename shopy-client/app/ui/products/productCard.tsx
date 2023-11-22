import { Card, Image, Text, Group} from '@mantine/core';
import { ProductDto } from '@/app/src/dto/products.dto';
import Link from 'next/link';
import classes from '@/app/styles/product/card.module.css';
import { deleteProduct } from '@/app/src/lib/actions/products.action';

enum Currency {
  USD = '$',
  EUR = '\u20AC'
}

export default function ProductCard({ product }: ProductDto) {
  const { name, price, currency, imageUrl = '/Product.png', _id } = product;
  return (
    <Card withBorder shadow="sm" padding="lg" radius="md" h="300">
      <Card.Section>
        <Link
          href={`/dashboard/products/${_id}`}
        >
          <Image className={classes.edit} src="/Edit.svg" alt="remove product" h={32} w={32}/>
        </Link>
        <Image
          className={classes.delete}
          src="/Remove.svg"
          alt="remove product"
          h={32}
          w={32}
          onClick={async () => deleteProduct(_id)}
        />
        <Image src={imageUrl} alt={name} height={200} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={700}>{name}</Text>
      </Group>

      <Group justify="space-between" gap="xl">
        <Link
          href={`/dashboard/products/${_id}`}
          className={classes.link}
          >
        <Text c="dimmed">
            Price:
          </Text>
        </Link>

        <Text fw={700}>
          {Currency[currency]} {price}
        </Text>
      </Group>
    </Card>
  );
}
