import { Container, Center } from '@mantine/core';
import SearchBar from '@/app/ui/marketplace/search';
import ProductList from '@/app/ui/marketplace/productList';
import { getProductList }  from '@/app/src/lib/actions/products.action';
import Pagination from '@/app/ui/dasboard/pagination';
import Filter from '@/app/ui/marketplace/filter';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

export default async function Page({ searchParams }: { searchParams?: {
  query: string,
  page: string,
  from: string,
  to: string
  }}) {
  // @ts-ignore
  const { query = '', page : currentPage = 1, from, to } = searchParams;
  const filters= [Number(from), Number(to)];
  const quantity = { $gt: 0 };
  const { docs: products, count } = await getProductList(false, query, Number(currentPage), ITEMS_PER_PAGE, filters, quantity);
  return(
    <main>
      <Filter/>
      <Container size="md">
        <SearchBar/>
      </Container>
      <Container my="md">
        <ProductList products={products}/>
      </Container>
      <Center>
        <Pagination count={count} />
      </Center>
    </main>
  );
}
