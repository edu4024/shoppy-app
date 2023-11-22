import CartNav from '@/app/ui/cart/cartNav';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <CartNav/>
      <div>{children}</div>
    </main>
  );
}
