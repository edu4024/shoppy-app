'use client';
import CartList from '@/app/ui/cart/cartList';
import CheckOut from '@/app/ui/cart/checkOut';
import { useCart } from '@/app/src/providers/CartProvider';

export default function Page () {
  const [cart] = useCart();
  return (
    <main>
      <CheckOut/>
      <CartList docs={cart}/>
    </main>
  );
}

