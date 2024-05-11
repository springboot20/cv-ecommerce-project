import { Fragment, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Modal } from '../components/modal/Modal';
import { classNames, formatPrice } from '../helpers';
import { motion } from 'framer-motion';
import { Pagination } from '../components/Pagination';
import { gridVariants } from '../util/framerMotion.config';
import { Button } from '@material-tailwind/react';
import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useGetProductsQuery } from '../features/product/product.endpoints';
import { Loader } from '../components/Loader';

const Products = () => {
  const { tokens } = useAuth();

  const { data, isLoading } = useGetProductsQuery();
  const products = data;

  // const [activeButton, setActiveButton] = useState<boolean>(true);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);

  const options = useMemo(
    () => [
      {
        value: 'H',
        label: 'Health',
      },
    ],
    []
  );

  const [localOptions, setLocalOptions] = useState<typeof options>([]);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  return (
    <Fragment>
      <Modal token={tokens?.accessToken} />
      <Fragment>
        <main className='bg-hero-bg h-[70vh] bg-no-repeat bg-cover mt-40'></main>
        <section className='w-full'>
          <div className='max-w-9xl mx-auto'>
            <div className='w-full min-h-screen absolute justify-between lg:relative left-0 right-0'>
              <header className='h-24'>
                <nav className='px-8 flex items-center space-x-4 h-full'>
                  <Button className='capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none'>
                    everyday essentials
                  </Button>
                  <Button className='capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none'>
                    cleaning essentials
                  </Button>
                  <Button className='capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none'>
                    immunity & health
                  </Button>
                  <Button className='capitalize bg-[#f4f4f4] !rounded-none py-5 text-xl font-semibold text-[#4a4b4d] shadow-none'>
                    vitamine supplement
                  </Button>
                </nav>

                <div className='flex items-start justify-between px-8 mt-4'>
                  <span className='text-xl text-gray-700 font-semibold space-x-3'>
                    <small>40</small>
                    <span>products</span>
                  </span>
                  <Combobox
                    as='div'
                    onChange={({ value }) => setValue(value)}
                    value={options.find((opt) => opt.value === value)}>
                    <div className='relative'>
                      <Combobox.Button className='w-full'>
                        <Combobox.Input
                          displayValue={(option: (typeof options)[0]) => option?.label}
                          onChange={(event) => {
                            setLocalOptions(
                              options.filter((opt) => opt.label.includes(event.target.value))
                            );
                            setQuery(event.target.value);
                          }}
                          placeholder={'Sort'}
                          className='w-full px-5 py-4 bg-gray-200 text-gray-800 font-medium text-base block rounded-none border-0 outline outline-[1px] outline-zinc-400 placeholder:text-gray-700 focus:ring-[1px] focus:ring-white'
                        />
                      </Combobox.Button>
                      <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
                        <ChevronUpDownIcon className='h-8 w-8 text-gray-700' aria-hidden='true' />
                      </Combobox.Button>

                      {localOptions.length > 0 && (
                        <Combobox.Options className='outline outline-[1px] outline-zinc-400 bg-white absolute z-10 mt-2 max-h-60 w-full overflow-auto  text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm'>
                          {localOptions.length === 0 && query !== '' ? (
                            <div className='relative cursor-default select-none px-4 py-2 text-gray-700 '>
                              Nothing found.
                            </div>
                          ) : (
                            localOptions.map((opt) => {
                              return (
                                <Combobox.Option
                                  key={opt.value}
                                  value={opt}
                                  className={({ active }) =>
                                    classNames(
                                      'cursor-pointer relative select-none py-3 px-2 w-full',
                                      active ? 'bg-gray-200 text-gray-700 ' : 'text-gray-800'
                                    )
                                  }>
                                  {({ active, selected }) => (
                                    <>
                                      <span
                                        className={classNames(
                                          'block truncate',
                                          selected ? 'font-semibold' : ''
                                        )}>
                                        {opt.label}
                                      </span>
                                      {selected && (
                                        <span
                                          className={classNames(
                                            'absolute inset-y-0 right-0 flex items-center pr-4',
                                            active ? 'text-green-700' : 'text-green-600'
                                          )}>
                                          <CheckIcon
                                            className='h-4 w-4 stroke-[4]'
                                            aria-hidden='true'
                                          />
                                        </span>
                                      )}
                                    </>
                                  )}
                                </Combobox.Option>
                              );
                            })
                          )}
                        </Combobox.Options>
                      )}
                    </div>
                  </Combobox>
                </div>
              </header>

              <motion.div
                layout
                initial='hidden'
                animate='visible'
                variants={gridVariants}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 mt-24'>
                {isLoading ? (
                  <Loader />
                ) : (
                  currentProducts?.map((product) => {
                    return (
                      <motion.div layout key={product._id}>
                        <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                          <img src={product.mainImg.url} alt='' className='h-60' />
                        </header>
                        <div className='mt-4 space-y-3'>
                          <h3 className='capitalize text-xl font-semibold text-gray-700'>
                            {product.name}
                          </h3>
                          <p className='text-lg font-medium italic'>{formatPrice(product.price)}</p>
                        </div>
                      </motion.div>
                    );
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
  );
};
export default Products;
