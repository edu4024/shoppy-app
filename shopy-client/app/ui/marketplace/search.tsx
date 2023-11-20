'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Search product by name"
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      defaultValue={searchParams.get('name')?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}
