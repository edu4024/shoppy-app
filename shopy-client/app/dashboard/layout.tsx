import Header from '@/app/ui/dasboard/header';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-row md:overflow-hidden">
      <div className="">
        <Header />
      </div>
      <div className="">{children}</div>
    </div>
  );
}
