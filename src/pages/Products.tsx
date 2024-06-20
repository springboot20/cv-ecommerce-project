import { Fragment } from 'react'
import { formatPrice } from '../helpers'
import { motion } from 'framer-motion'
import { Pagination } from '../components/Pagination'
import { gridVariants } from '../util/framerMotion.config'
import { Button } from '@material-tailwind/react'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProduct'

const Products = () => {
  const {
    products,
    categories,
    isLoading,
    setCurrentPage,
    currentPage,
    itemsPerPage,
  } = useProduct()

  return (
    <Fragment>
      <Fragment>
        <main className="bg-hero-bg h-[70vh] bg-no-repeat bg-cover mt-40"></main>
        <section className="w-full">
          <div className="max-w-9xl mx-auto">
            <div className="w-full min-h-screen absolute justify-between lg:relative left-0 right-0">
              <header className="h-24">
                <nav className="px-8 flex items-center space-x-4 h-full">
                  {categories.map((c) => (
                    <Button
                      className="capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none"
                      key={c.name}
                    >
                      {c.name}
                    </Button>
                  ))}
                </nav>

                <div className="flex items-start justify-between px-8 mt-4">
                  <span className="text-xl text-gray-700 font-semibold space-x-3">
                    <small>{products.length}</small>
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
                  products?.map((product) => {
                    return (
                      <motion.div layout key={product.id}>
                        <Link to={`/collections/${product.id}`}>
                          <header className="h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center">
                            <img
                              src={product.images[0]}
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
                    )
                  })
                )}
              </motion.div>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                totalItems={products?.length}
              />
            </div>
          </div>
        </section>
      </Fragment>
    </Fragment>
  )
}
export default Products
