import { Card, Image, Text, Group, Button} from '@mantine/core';
import { ProductDto } from '@/app/src/dto/products.dto';

enum Currency {
  USD = '$',
  EUR = '\u20AC'
}

export default function ProductCard({ product }: ProductDto) {
  const { name, price, currency, imageUrl = '/Product.png' } = product;
  return (
    <Card withBorder shadow="sm" padding="lg" radius="md">
      <Card.Section>
        <Image src={imageUrl} alt={name} height={200} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={700}>{name}</Text>
      </Group>

      <Group justify="space-between" gap="xl">
        <Text c="dimmed">
          Price:
        </Text>
        <Text fw={700}>
          {Currency[currency]} {price}
        </Text>
      </Group>


      <Group mt="xs">
        <Button radius="md" style={{ flex: 1 }}>
          Add to Cart
        </Button>
      </Group>
    </Card>
  );
}
