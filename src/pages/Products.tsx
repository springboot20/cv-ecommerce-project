import { Fragment, useEffect, useState } from 'react'
import { formatPrice } from '../helpers'
import { motion } from 'framer-motion'
import { Pagination } from '../components/Pagination'
import { gridVariants } from '../util/framerMotion.config'
import { Button } from '@material-tailwind/react'
import { Loader } from '../components/Loader'
import { instance } from '../api/ClientService'
import { ProductType } from '../types'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { truncate } from "../helpers" 

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<
    { name: string; image: string; id: number | string }[]
  >([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const itemsPerPage = 12
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  const handleProductFetch = async () => {
    try {
      setIsLoading(true)
      const response = await instance.get('/products')
      setProducts(response.data)
      setFilteredProducts(response.data) // Initialize filteredProducts with all products
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message)
        console.log(`Error occurred during fetching: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategories = async () => {
    try {
      const response = await instance.get('/categories')
      setCategories(response.data)
    } catch (err) {
      if (err instanceof Error) {
        toast(err.message)
        console.log(`Error occurred during fetching: ${err.message}`)
      }
    }
  }

  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategory(categoryName)
    if (categoryName) {
      setFilteredProducts(
        products.filter((product) => product.category === categoryName),
      )
    } else {
      setFilteredProducts(products)
    }
    setCurrentPage(1) // Reset to first page whenever category changes
  }

  console.log(filteredProducts)

  useEffect(() => {
    handleProductFetch()
    handleCategories()
  }, [])

  return (
    <Fragment>
      <section className="mt-[11rem] relative">
        <div className="max-w-9xl mx-auto relative">
          <div className="w-full min-h-screen justify-between relative">
            <header className="h-24">
              <nav className="px-8 flex items-center space-x-4 h-full">
                <Button
                  className={`capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none ${
                    selectedCategory === null ? 'bg-gray-300' : ''
                  }`}
                  onClick={() => handleCategorySelect(null)}
                >
                  All
                </Button>
											<div className="flex flex-wrap space-x-4">
                {categories.map((c) => (
                  <Button
                    className={`capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none ${
                      selectedCategory === c.name ? 'bg-gray-300' : ''
                    }`}
                    key={c.id}
                    onClick={() => handleCategorySelect(c.name)}
                  >
                    {truncate 
(c.name, 9)}
                  </Button>
                ))}
											</div>
              </nav>

              <div className="flex items-start justify-between px-8 mt-4">
                <span className="text-xl text-gray-700 font-semibold space-x-3">
                  <small>{filteredProducts.length}</small>
                  <span>products</span>
                </span>
              </div>
            </header>

            <motion.div
              layout
              initial="hidden"
              animate="visible"
              variants={gridVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-24"
            >
              {isLoading ? (
                <Loader />
              ) : (
                currentProducts.map((product) => (
                  <motion.div layout key={product.id}>
                    <Link to={`/collections/${product.id}`}>
                      <header className="h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center">
                        <img
                          src={product.images && product.images[0]}
                          alt=""
                          className="h-full absolute w-full"
                        />
                      </header>
                      <div className="mt-4 space-y-3">
                        <h3 className="capitalize text-xl font-semibold text-gray-700">
                          {product.title}
                        </h3>
                        <p className="text-lg font-medium italic">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalItems={filteredProducts.length}
            />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Products
