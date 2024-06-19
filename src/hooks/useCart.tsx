import { CartContext } from '../context/CartContext'
import { useContext } from 'react'

export const useCart = () => {
  return useContext(CartContext)
}
