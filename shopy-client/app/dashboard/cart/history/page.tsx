import { getHistory } from '@/app/src/lib/actions/history';
import CartList from '@/app/ui/cart/cartList';

export default async function Page () {
  const { docs } = await getHistory();
  return (
    <main>
      <CartList docs={docs[0]?.products}/>
    </main>
  );
}

