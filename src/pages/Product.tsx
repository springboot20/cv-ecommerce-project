import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HeartIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import { getProduct } from '../api/Axios';
import { ProductInterface } from '../types/product.types';
import { apiRequestHandler } from '../util';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { productCarouselSettings } from '../util/slickSlider.config';
import { useParams } from 'react-router-dom';

import { gridVariants } from '../util/framerMotion.config';

import Clorox from '../assets/clorox.png';
import { Disclosure } from '@headlessui/react';

import BodySpray from '../assets/spray.png';
import Vitamin from '../assets/vitamin.png';
import HandGloves from '../assets/gloves.png';
import Sanitizer from '../assets/sanitizer.png';
import FaceMask from '../assets/face-mask.png';
import Deodorant from '../assets/deodorant.png';

export const Product = () => {
  const { tokens } = useAuth();
  const { id } = useParams();
  const [currentCarouselSlide, setCurrentCarouselSlide] = useState<number>(0);
  const [product, setProduct] = useState<ProductInterface>({} as ProductInterface);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFetchProduct = async (productId?: string) => {
    await apiRequestHandler({
      api: async () => await getProduct(productId),
      setLoading: setLoadingProduct,
      onSuccess: (response, message, toast) => {
        const { data } = response;

        setProduct(data?.products || {});

        toast(message);
      },
      onError: (error, toast) => {
        toast(error);
      },
    });
  };
  return (
    <motion.main layout initial='hidden' animate='visible' variants={gridVariants}>
      <div className='max-w-9xl mx-auto mt-40 py-8'>
        <section className='grid grid-cols-1 md:grid-cols-2 place-items-center lg:place-items-start place-content-center gap-8 px-8'>
          <div className='col-span-full md:col-span-1 flex items-start gap-2'>
            <div className=''></div>
            <div className='bg-[#d2d2d2]'>
              <img src={Clorox} alt='' />
            </div>
          </div>
          <div className='col-span-full md:col-span-1 w-full'>
            <div className='flex items-center justify-between w-full'>
              <div className='space-y-4'>
                <h3 className='uppercase text-2xl font-bold text-gray-800'>clorox wipes</h3>
                <p className='text-2xl font-bold text-[#e2342d] uppercase'>$ 40.00</p>
              </div>
              <Button variant='text' onClick={() => setFavorite((prev) => !prev)}>
                {favorite ? (
                  <HeartIcon className='h-10 fill-[#e2342d]' />
                ) : (
                  <HeartIcon className='h-10 fill-none stroke-2' />
                )}
              </Button>
            </div>
            <div className='flex items-center space-x-5 mt-8'>
              <Button className='bg-gray-300 text-gray-700 py-5 px-7 shadow-none rounded-none uppercase'>
                black
              </Button>
              <Button className='bg-gray-300 text-gray-700 py-5 px-7 shadow-none rounded-none uppercase'>
                gold
              </Button>
              <Button className='bg-gray-300 text-gray-700 py-5 px-7 shadow-none rounded-none uppercase'>
                apollo
              </Button>
            </div>

            <Button
              className='w-full uppercase text-center py-5 rounded-none shadow-none text-2xl tracking-widest mt-14 bg-[#004197] font-thin'
              fullWidth>
              add to cart
            </Button>

            <div className='mt-6'>
              <p className='text-xl font-medium text-gray-700'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores veritatis earum
                illum enim vel culpa animi reprehenderit aliquam velit quia optio beatae nobis,
                incidunt modi fugit! Repudiandae harum similique corrupti.
              </p>

              <Disclosure as='ul' className='mt-10 space-y-5'>
                <Disclosure as='li'>
                  {({ open }) => (
                    <div className='flex items-start flex-col'>
                      <div className='flex justify-end w-full border border-gray-900/40 py-4 px-4'>
                        <p className='text-center w-full text-2xl text-gray-700 font-thin uppercase'>
                          category
                        </p>
                        <Disclosure.Button className='self-end inline-block'>
                          <span className='sr-only'>open</span>
                          {open ? (
                            <ChevronUpIcon className='h-6 text-gray-700' />
                          ) : (
                            <ChevronDownIcon className='h-6 text-gray-700' />
                          )}
                        </Disclosure.Button>
                      </div>

                      <Disclosure.Panel className='bg-white transition-all w-full'>
                        <div className='space-y-3 px-2 pb-3 pt-2'></div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
                <Disclosure as='li'>
                  {({ open }) => (
                    <div className='flex items-start flex-col'>
                      <div className='flex justify-end w-full border border-gray-900/40 py-4 px-4'>
                        <p className='text-center w-full text-2xl text-gray-700 font-thin uppercase'>
                          company
                        </p>
                        <Disclosure.Button className='self-end inline-block'>
                          <span className='sr-only'>open</span>
                          {open ? (
                            <ChevronUpIcon className='h-6 text-gray-700' />
                          ) : (
                            <ChevronDownIcon className='h-6 text-gray-700' />
                          )}
                        </Disclosure.Button>
                      </div>

                      <Disclosure.Panel className='bg-white transition-all w-full'>
                        <div className='space-y-3 px-2 pb-3 pt-2'></div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
                <Disclosure as='li'>
                  {({ open }) => (
                    <div className='flex items-start flex-col'>
                      <div className='flex justify-end w-full border border-gray-900/40 py-4 px-4'>
                        <p className='text-center w-full text-2xl text-gray-700 font-thin uppercase'>
                          policy
                        </p>
                        <Disclosure.Button className='self-end inline-block'>
                          <span className='sr-only'>open</span>
                          {open ? (
                            <ChevronUpIcon className='h-6 text-gray-700' />
                          ) : (
                            <ChevronDownIcon className='h-6 text-gray-700' />
                          )}
                        </Disclosure.Button>
                      </div>

                      <Disclosure.Panel className='bg-white transition-all w-full'>
                        <div className='space-y-3 px-2 pb-3 pt-2'></div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </Disclosure>
            </div>
          </div>
        </section>

        <section className='py-10 w-full'>
          <h1 className='text-3xl font-bold text-gray-700 uppercase text-center'>
            you may also like
          </h1>
          <Slider {...productCarouselSettings} className='flex gap-4 mt-4 w-full'>
            <motion.div className='w-full relative'>
              <span className='absolute py-1.5 px-12 z-20 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                top seller
              </span>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={FaceMask} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>
            <motion.div className='w-full'>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={BodySpray} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>{' '}
            <motion.div className='w-full'>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={Sanitizer} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>
            <motion.div className='w-full'>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={Deodorant} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>
            <motion.div className='w-full'>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={Vitamin} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>
            <motion.div className='w-full'>
              <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                <img src={HandGloves} alt='' className='h-72' />
              </header>
              <div className='mt-4 space-y-3'>
                <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                <p className='text-lg font-medium italic'>$50</p>
              </div>
            </motion.div>
          </Slider>
        </section>
      </div>
    </motion.main>
  );
};

// top-24 min-h-[calc(100%-8rem)] max-w-[105rem] relative mb-5
