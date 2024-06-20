import React, { createContext, useMemo, useState, useEffect } from 'react'
import { ProductContextType } from '../types/context.types'
import { instance } from '../api/ClientService'
import { ProductType } from '../types'
import { useParams } from 'react-router-dom'

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType,
)

export const ProductContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { id } = useParams()
  const [product, setProduct] = useState<ProductType>({} as ProductType)
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<
    { name: string; image: string; id: number | string }[]
  >([])

  // const [activeButton, setActiveButton] = useState<boolean>(true);
  const itemsPerPage = 150
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = products?.slice(startIndex, endIndex)

  const handleProductFetch = async () => {
    try {
      setIsLoading && setIsLoading(false)

      const response = await instance.get('/products')
      setProducts(response.data)
      console.log(response.data)
    } catch (err) {
      setIsLoading && setIsLoading(true)
    }
  }

  const handleCategories = async () => {
    try {
      setIsLoading && setIsLoading(false)

      const response = await instance.get('/categories')
      setCategories(response.data)
    } catch (err) {
      setIsLoading && setIsLoading(true)
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await instance.get(`/products/${id}`)
        setProduct(response.data)

        // Assuming your API endpoint for related products is something like `/products/${id}/related`
        const relatedResponse = await instance.get(
          `/products/?category=${response.data.category}`,
        )
        setRelatedProducts(relatedResponse.data)
      } catch (error) {
        console.log('Error fetching product or related products:', error)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    handleProductFetch()
    handleCategories()
  }, [])

  const contextValues = useMemo(
    () => ({
      products: currentProducts,
      setCurrentPage,
      isLoading,
      categories,
      relatedProducts,
      product,
      itemsPerPage,
      currentPage,
    }),
    [
      categories,
      currentProducts,
      isLoading,
      product,
      relatedProducts,
      itemsPerPage,
      currentPage,
    ],
  )
  return (
    <ProductContext.Provider value={contextValues}>
      {children}
    </ProductContext.Provider>
  )
}
