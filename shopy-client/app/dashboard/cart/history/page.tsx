import { getHistory } from '@/app/src/lib/actions/history';
import CartTable from '@/app/ui/cart/cartTable';

export default async function Page () {
  const { docs } = await getHistory();
  return (
    <main>
      <CartTable docs={docs[0]?.products}/>
    </main>
  );
}

