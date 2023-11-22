import CartList from '@/app/ui/cart/cartList';
import CheckOut from '@/app/ui/cart/checkOut';
export default async function Page () {
  return (
    <main>
      <CheckOut/>
      <CartList/>
    </main>
  );
}

