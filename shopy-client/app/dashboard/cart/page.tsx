'use client';
import CartTable from '@/app/ui/cart/cartTable';
import CheckOut from '@/app/ui/cart/checkOut';
import { useCart } from '@/app/src/providers/CartProvider';

export default function Page () {
  const [cart] = useCart();
  return (
    <main>
      <CheckOut/>
      <CartTable docs={cart}/>
    </main>
  );
}

