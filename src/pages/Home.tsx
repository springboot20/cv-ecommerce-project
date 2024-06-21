import { Fragment, useState, useEffect } from 'react'
import { ProductType } from '../types/'
import { Link } from 'react-router-dom'
import BusinessMan from '../assets/cover_img.png'
import { instance } from '../api/ClientService'
import { toast } from 'react-toastify'
import { Loader } from '../components/Loader'
import { classNames } from '../helpers'
import Slider from 'react-slick'
import { featuredCarouselSettings } from '../util/slickSlider.config'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading && setIsLoading(false)
        const featuredProductsResponse = await instance.get(`products/`)

        if (featuredProductsResponse.status.toString().startsWith('2')) {
          setFeaturedProducts(featuredProductsResponse.data)
        }
      } catch (err) {
        setIsLoading && setIsLoading(true)
        if (err instanceof Error) {
          toast.error(err.message)
        }
      } finally {
        setIsLoading && setIsLoading(true)
      }
    }

    fetchProduct()
  }, [])

  return (
    <Fragment>
      <main className="mt-40 relative lg:h-[calc(70vh-10rem)] grid place-items-center place-content-center bg-[#F8F8F8]">
        <div className="mx-auto max-w-9xl px-8 lg:px-0 py-6">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex items-start flex-col justify-between">
              <div className="space-y-5">
                <h1 className="text-5xl font-bold uppercase leading-snug text-[#3a408c]">
                  Providing Services at your Door
                </h1>
                <p className="text-2xl font-medium text-gray-700">
                  <small className="text-3xl font-semibold text-gray-800">
                    MACC Essentials
                  </small>{' '}
                  has an important role in making supplies and services
                  available to customers and their patients during this critical
                  time. This includes services from various domains. Our aim is
                  to aid you. As much we can.
                </p>
              </div>
              <Link
                to={'#'}
                className="py-4 inline-block px-14 text-xl font-bold bg-red-500 text-white mt-8"
              >
                Learn more
              </Link>
            </div>
            <div className="w-full lg:max-w-fit">
              <img
                src={BusinessMan}
                className="rounded-xl w-full lg:h-[40rem] block"
                alt="Business man image"
              />
            </div>
          </div>
        </div>
      </main>

      <section className="mt-8 h-[40vh]">
        <div className="mx-auto max-w-9xl px-8 lg:px-0">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-center text-4xl font-bold uppercase space-x-3">
              <span className="text-[#e2342d]">new</span>
              <span className="text-[#3a408c]">products</span>
            </h1>
            <Link
              to="/collections"
              className="py-2.5 px-3 text-sm font-medium text-gray-700 bg-[#d2d2d2]"
            >
              View all
            </Link>
          </div>

          {isLoading ? (
            <div
              className={classNames(
                'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 h-[40vh] relative',
                isLoading ? 'place-content-center ' : '',
              )}
            >
              <Loader />
            </div>
          ) : (
            <Slider
              {...featuredCarouselSettings}
              className="flex gap-4 mt-4 w-full"
            >
              {featuredProducts.slice(0, 5).map((product, index) => (
                <div
                  className="h-[34rem] relative bg-[#d2d2d2]"
                  key={product.id}
                >
                  {index === 0 && (
                    <span className="absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase">
                      top seller
                    </span>
                  )}
                  <img
                    src={product.images[0]}
                    alt=""
                    className="absolute h-full w-full"
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      <section className="mt-44 mb-10">
        <div className="mx-auto max-w-9xl px-8 lg:px-0">
          <div className="flex items-start flex-col lg:flex-row gap-5 mt-10">
            <div className="w-full flex-1">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl space-x-1 font-bold uppercase">
                  <span className="text-[#e2342d]">macc</span>
                  <span className="text-[#4a4b4d]">weekly discount</span>
                </h2>
                <Link
                  to="/collections"
                  className="py-2.5 px-3 text-sm font-medium text-gray-700 bg-[#d2d2d2]"
                >
                  View all
                </Link>
              </div>
              {isLoading ? (
                <div
                  className={classNames(
                    'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 h-[40vh] relative',
                    isLoading ? 'place-content-center' : '',
                  )}
                >
                  <Loader />
                </div>
              ) : (
                <Slider
                  {...featuredCarouselSettings}
                  className="flex gap-4 mt-4 w-full"
                >
                  {featuredProducts.slice(0, 5).map((product) => {
                    return (
                      <div
                        className="h-[36rem] bg-[#d2d2d2] relative"
                        key={product.id}
                      >
                        <span className="absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase">
                          20% off
                        </span>

                        <img
                          src={product.images[0]}
                          alt=""
                          className="absolute h-full w-full"
                        />
                      </div>
                    )
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
export default Home
