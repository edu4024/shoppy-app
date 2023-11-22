'use client';
import React, { createContext, useState } from 'react';
import { ProductDto } from '@/app/src/dto/products.dto';

const useCartState = () => useState<ProductDto []>([]);

export const CartContext = createContext<ReturnType<
  typeof useCartState
  > | null>(null);

export const useCart = () => {
  return React.useContext(CartContext);
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useCartState();

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
