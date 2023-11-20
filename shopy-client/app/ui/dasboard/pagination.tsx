'use client';
import { Pagination as Paginate } from '@mantine/core';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ITEMS_PER_PAGE } from '@/app/src/lib/constant';

export default function Pagination({ count }: { count: number }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePage, setPage] = useState(1);
  const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    createPageURL(activePage);
  });

  return (
    <Paginate total={totalPages} value={activePage} onChange={setPage} />
  );
}
