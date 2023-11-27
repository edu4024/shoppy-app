'use client';
import { Card, Image, Text, Group, Button} from '@mantine/core';
import { ProductDto } from '@/app/src/dto/products.dto';
import { useCart } from '@/app/src/providers/CartProvider';

enum Currency {
  USD = '$',
  EUR = '\u20AC'
}

export default function ProductCard({ product }: ProductDto) {
  const [cart, setCart] = useCart();
  const { name, price, currency, imageUrl = '/Product.png' } = product;
  const addToCart = (product) => {
    if (!cart.length) {
      setCart([{ product }]);
    }
    if (!cart.find(el => (el.product._id === product._id))) {
      setCart([...cart, { product }]);
    }
    return;
  };

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
        <Button
          radius="md"
          style={{ flex: 1 }}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </Group>
    </Card>
  );
}
