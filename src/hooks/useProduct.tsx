import { ProductContext } from '../context/ProductContext'
import { useContext } from 'react'

export const useProduct = () => {
  return useContext(ProductContext)
}
