import Header from '@/app/ui/dasboard/header';
import CartProvider from '@/app/src/providers/CartProvider';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row md:overflow-hidden">
      <CartProvider>
        <div className="">
          <Header />
        </div>
        <div>{children}</div>
      </CartProvider>
    </div>
  );
}
