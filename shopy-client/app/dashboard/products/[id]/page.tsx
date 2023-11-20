import ProductEdit from '@/app/ui/products/edit';
import { getProduct}  from '@/app/src/lib/actions/products.action';


export default async function Page({ params }: { params: { id: string } }) {
  let product = null;
  if (params.id !== '1') {
    product = await getProduct(params.id);
  }
  return (
    <ProductEdit product={product}/>
  );
}
