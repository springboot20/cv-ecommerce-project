import { useState, useEffect } from 'react'
import { HeartIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import { productCarouselSettings } from '../util/slickSlider.config'
import { useParams } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { instance } from '../api/ClientService'
import { gridVariants } from '../util/framerMotion.config'
import { ProductType } from '../types'
import { formatPrice } from '../helpers'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

const Product = () => {
  const { id } = useParams()
  const [favorite, setFavorite] = useState<boolean>(false)
  const [product, setProduct] = useState<ProductType>({} as ProductType)
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
  const [quantity, setQuantity] = useState<number>(1)
  const { addToCart } = useCart()

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

  const handleAddToCart = () => {
    addToCart({ product, quantity })
  }

  return (
    <motion.main
      layout
      initial="hidden"
      animate="visible"
      variants={gridVariants}
    >
      <div className="max-w-9xl mx-auto mt-44 py-8">
        <section className="grid grid-cols-1 md:grid-cols-2 place-items-center lg:place-items-start place-content-center gap-8 px-8">
          <div className="col-span-full md:col-span-1 flex items-start gap-2">
            <div className="bg-[#d2d2d2]">
              <img
                src={product.images && JSON.parse(product.images[0])}
                alt=""
              />
            </div>
          </div>
          <div className="col-span-full md:col-span-1 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="space-y-4">
                <h3 className="uppercase text-2xl font-bold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-2xl font-bold text-[#e2342d] uppercase">
                  {formatPrice(product.price)}
                </p>
              </div>
              <Button
                variant="text"
                onClick={() => setFavorite((prev) => !prev)}
              >
                {favorite ? (
                  <HeartIcon className="h-10 fill-[#e2342d]" />
                ) : (
                  <HeartIcon className="h-10 fill-none stroke-2" />
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-5 mt-8">
              {/* Color buttons */}
            </div>

            <div className="mt-3 col-span-full">
              <form className="grid grid-cols-2 space-y-4 ">
                <fieldset className="col-span-full md:col-span-3 relative flex justify-between items-center">
                  <Button
                    type="button"
                    id="minus-btn"
                    variant="text"
                    onClick={() =>
                      setQuantity((prevQuantity) => prevQuantity - 1)
                    }
                    className="p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white"
                  >
                    <MinusIcon id="minus-icon" className="h-5 w-5" />
                  </Button>
                  <span className="text-2xl text-gray-800 dark:text-white font-semibold">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    id="plus-btn"
                    variant="text"
                    className="p-3 text-gray-800 focus:ring-offset-2 transition-all flex items-center dark:text-white"
                    onClick={() =>
                      setQuantity((prevQuantity) => prevQuantity + 1)
                    }
                  >
                    <PlusIcon id="plus-icon" className="h-5 w-5" />
                  </Button>
                </fieldset>

                <div className="flex items-center space-x-6 col-span-full">
                  <Button
                    className="w-full uppercase text-center py-5 rounded-none shadow-none text-2xl tracking-widest mt-14 bg-[#004197] font-thin"
                    onClick={handleAddToCart}
                    fullWidth
                  >
                    add to cart
                  </Button>
                </div>
              </form>
            </div>

            <div className="mt-6">
              <p className="text-xl font-medium text-gray-700">
                {product.description}
              </p>

              <Disclosure as="ul" className="mt-10 space-y-5">
                {/* Disclosure items */}
              </Disclosure>
            </div>
          </div>
        </section>

        <section className="py-10 w-full">
          <h1 className="text-3xl font-bold text-gray-700 uppercase text-center">
            you may also like
          </h1>
          <Slider
            {...productCarouselSettings}
            className="flex gap-4 mt-4 w-full"
          >
            {relatedProducts.map((product) => (
              <motion.div className="w-full relative" key={product.id}>
                <Link to={`/collections/${product.id}`}>
                  <span className="absolute py-1.5 px-12 z-20 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase">
                    top seller
                  </span>
                  <header className="h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center">
                    <img
                      src={product.images && JSON.parse(product.images[0])}
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
            ))}
          </Slider>
        </section>
      </div>
    </motion.main>
  )
}

export default Product
