import React, { createContext, useState } from 'react'
import { CartContextType } from '../types/context.types'
import { CartTypes, ProductType } from '../types/index'

export const CartContext = createContext<CartContextType>({} as CartContextType)

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartTypes[]>([])

  const addToCart = (p: { product: ProductType; quantity: number }) => {
    const itemExists = cartItems.find(
      (item) => item.product.id === p.product.id,
    )
    if (itemExists) {
      const updatedCart = cartItems.map((item) =>
        item.product.id === item.product.id
          ? { ...item, quantity: item.quantity }
          : item,
      )
      setCartItems(updatedCart)

      console.log(cartItems)
    } else {
      const newCartItem: CartTypes = { ...p }
      setCartItems([...cartItems, newCartItem])
    }
  }

  const removeFromCart = (productId: string | number) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId,
    )
    setCartItems(updatedCart)
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
