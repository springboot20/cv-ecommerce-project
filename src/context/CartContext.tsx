/** @format */

import React, { createContext, useContext } from 'react';
import { CartContextInterface } from '../types/context.types';

const CartContext = createContext<CartContextInterface>({
  items: null,
  addItemOrUpdateItemQuantity: async () => Promise<void>,
  clearCart: async () => Promise<void>,
  getUserCart: async () => Promise<void>,
  removeItemFromCart: async () => Promise<void>,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  return <CartContext.Provider value={{} as CartContextInterface}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
