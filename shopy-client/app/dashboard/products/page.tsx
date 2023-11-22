import { Container, Center } from '@mantine/core';
import ProductList from '@/app/ui/products/productList';
import { getProductList }  from '@/app/src/lib/actions/products.action';
import Pagination from '@/app/ui/dasboard/pagination';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

export default async function Page({ searchParams }: { searchParams?: {
    query: string,
    page: string,
  }}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = currentPage === 1? ITEMS_PER_PAGE - 1 : ITEMS_PER_PAGE;
  const { docs: products, count } = await getProductList(true, query, Number(currentPage), Number(limit));
  return(
    <main>
      <Container my="md">
        <ProductList products={products}/>
      </Container>
      <Center>
        <Pagination count={count} />
      </Center>
    </main>
  );
}
