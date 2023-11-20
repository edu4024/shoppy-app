'use client';
import {
  Container,
  Group,
  Image,
  Button,
  TextInput,
  Stack,
  Space,
  Select,
  FileButton,
  NumberInput
} from '@mantine/core';
import { useState } from 'react';
import { createProduct, updateProduct }  from '@/app/src/lib/actions/products.action';
import { ProductDto } from '@/app/src/dto/products.dto';

const currencyList = ['USD', 'EUR'];

export default function ProductEdit (
  { product } : { product: ProductDto }
) {

  const title = !product ? 'Create new product' : 'Update product';
  const [filePreview, setFilePreview] = useState(product?.imageUrl || '');
  const [uploadFile, setFile] = useState('');
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [currency, setCurrency] = useState(product?.currency || currencyList[0]);
  const image = filePreview? filePreview : '/Product.png';

  const fileHandler = (e: any) => {
    if (e) {
      setFile(e);
      setFilePreview(URL.createObjectURL(e));
    }
  };
  const submit = () => {
    const formData  = new FormData();
    if (uploadFile) formData.append('file', uploadFile);

    formData.append('name', name);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('currency', currency);
    if (!product) {
      createProduct(formData);
    } else {
      updateProduct(product._id, formData);
    }

  };

  return(
    <main>
      <Container size="lg">
        <h1>{title}</h1>
        <Space h="xl" />
        <Group gap="lg">
          <Image src={image} alt="add product" h={180} w={180} />
          <FileButton
            variant="default"
            size="xl"
            radius="md"
            accept="image/png,image/jpeg,image/svg"
            onChange={fileHandler}
          >
            {(props) => <Button {...props}>Upload Image</Button>}
          </FileButton>
        </Group>
      </Container>
      <Space h="xl" />
      <Container size="lg">
        <Stack>
          <TextInput
            size="lg"
            radius="md"
            label="Name of the product"
            placeholder="Enter name of the product"
            defaultValue={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <NumberInput
            size="lg"
            radius="md"
            label="Price"
            placeholder="Enter price of the product"
            defaultValue={price}
            onChange={(e) => {
              setPrice(e);
            }}
          />
          <NumberInput
            size="lg"
            radius="md"
            hideControls
            label="Count"
            placeholder="Enter count of the product"
            defaultValue={quantity}
            onChange={(e) => {
              setQuantity(e);
            }}
          />
          <Select
            size="lg"
            radius="md"
            label="Select currency"
            placeholder="Default $"
            defaultValue={currency}
            data={currencyList}
            onChange={(e) => {
              setCurrency(e);
            }}
          />
        </Stack>
      </Container>
      <Space h="xl" />
      <Container px={0} size="30rem">
        <Group justify="center">
          <Button variant="filled" size="xl" radius="md" onClick={submit}>Upload Product</Button>
        </Group>
      </Container>
    </main>
  );

}
