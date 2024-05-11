<div className='absolute top-28 left-1/2 right-1/2 -translate-x-1/2 w-1/3'>
            <div className=''>
              <InputField
                type='search'
                placeholder='Search'
                className='peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-white border-t-transparent !border-t-blue-gray-300 bg-transparent px-4 py-4 pl-12 font-sans text-xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder:text-blue-gray-300 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder:text-xl placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-blue-gray-300 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
              />
            </div>
            <MagnifyingGlassIcon className='h-6 stroke-[3] text-gray-800 absolute left-4 top-1/2 -translate-y-1/2' />
          </div>
          <div className='h-full grid grid-cols-2 gap-8 place-items-center md:place-content-center px-6'>
            <article className='col-span-full sm:col-span-1'>
              <h1 className='text-gray-900 dark:text-white text-5xl font-extrabold mb-7'>
                Design Your <br /> Comfort Zone
              </h1>
              <p className='text-gray-600 dark:text-white text-lg font-medium mb-7'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis
                corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus,
                obcaecati libero et quia tempora excepturi quis alias?
              </p>
              <Button
                className='capitalize px-7 py-2 rounded-md bg-gray-900 hover:bg-gray-700 dark:bg-white dark:text-gray-800 text-xl font-bold text-white'
                type='button'>
                shop now
              </Button>
            </article>
            <article className='col-span-full sm:col-span-1'>
              <h1 className='text-gray-900 dark:text-white text-5xl font-extrabold mb-7'>
                Design Your <br /> Comfort Zone
              </h1>
              <p className='text-gray-600 dark:text-white text-lg font-medium mb-7'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis
                corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus,
                obcaecati libero et quia tempora excepturi quis alias?
              </p>
            </article>
          </div>
>

<div className=''>
                    <form action=''>
                      <div className='flex'>
                        <Input
                          type='text'
                          ref={searchRef}
                          className='!py-6 px-5 !border-t-gray-500 !border-gray-500 w-[35rem]'
                          placeholder='Search for products'
                          labelProps={{
                            className: 'before:content-none after:content-none',
                          }}
                          icon={
                            <MagnifyingGlassIcon
                              className='cursor-pointer'
                              onClick={() => {
                                // ts-ignore
                                searchRef.current?.childNodes[1]?.focus() as HTMLInputElement;
                              }}
                            />
                          }
                          crossOrigin={null}
                        />
                        <div className='input-group-append'>
                          <span className='input-group-text bg-transparent text-primary'></span>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className='flex sm:flex-[0] flex-1 items-center justify-center sm:justify-start'>
                    <div className='flex flex-shrink-0 items-center space-x-3'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 576 512'
                        fill='rgb(139 92 246)'
                        className='h-8 ml-4'>
                        <path d='M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z' />
                      </svg>
                      <span className='logo-name text-gray-800 dark:text-white text-xl font-medium'>
                        Cart Shop
                      </span>
                    </div>
                  </div>

                  <div className='absolute inset-y-0 right-0 flex items-center gap-3 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    {!auth.tokens?.access_token && (
                      <div className='flex items-center space-x-3 flex-shrink-0'>
                        <div className='hidden sm:block px-5 py-3 text-sm text-gray-800 hover:bg-gray-800/80 hover:text-white rounded-md transition-all border-2 border-gray-800 lg:mr-6'>
                          <Link to='/auth/signup' className='font-semibold text-center block'>
                            Sign Up
                          </Link>
                        </div>
                        <div className='hidden sm:block  px-5 py-3 text-sm text-white hover:bg-slate-700 rounded-md transition-all bg-gray-800 lg:mr-6'>
                          <Link to='/auth/signin' className='font-semibold text-center block'>
                            Sign In
                          </Link>
                        </div>
                      </div>
                    )}

                    {auth.tokens?.access_token && (
                      <ModeToggler
                        icon={<IconType icon={activeMode ? faMoon : faSun} className='h-5' />}
                        active={activeMode}
                        setTheme={setTheme}
                        activate={activateTheme}
                        className={
                          'p-4 h-18 w-18 dark:bg-gray-700 sm:items-center ring-2 dark:ring-gray-700/50 dark:text-white text-gray-900 shadow-md rounded-md hidden sm:flex'
                        }
                      />
                    )}

                    {auth.tokens?.access_token && (
                      <>
                        <button
                          type='button'
                          className='rounded-full dark:bg-gray-800 p-1 text-gray-900 shadow-md dark:text-white dark:hover:text-white focus:outline-none focus:ring-2 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-800'>
                          <span className='sr-only'>View notifications</span>
                          <BellIcon className='h-8 w-8 ' aria-hidden='true' />
                        </button>

                        {/* Profile dropdown */}

                        <Menu as='div' className='relative'>
                          <div>
                            <Menu.Button className='flex dark:text-white text-gray-900'>
                              <span className='sr-only'>Open auth menu</span>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 448 512'
                                className='h-8 fill-gray-900 dark:fill-white'>
                                <path d='M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z' />
                              </svg>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'>
                            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to='/profile'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}>
                                    Your Profile
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to='#'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}>
                                    Settings
                                  </NavLink>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <NavLink
                                    to='/auth/signin'
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                    onClick={handleLogOut}>
                                    Sign out
                                  </NavLink>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          }
        </Disclosure>
        <Disclosure as='header' className='mt-24 fixed left-1/4 z-10'>
          {({ open }) => (
            <>
              <div className='max-w-full px-2 sm:px-2 lg:px-4'>
                <div className='relative flex h-24 items-center justify-between'>
                  <div className='absolute inset-y-0 right-0 flex items-center sm:hidden'>
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 dark:text-white text-gray-900 bg-gray-50 hover:dark:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black/20'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon className='block h-10 w-10' aria-hidden='true' />
                      ) : (
                        <Bars3Icon className='block h-10 w-10' aria-hidden='true' />
                      )}
                    </Disclosure.Button>
                  </div>

                  {/* {auth.tokens?.access_token && ( */}
                  <div className='hidden sm:ml-4 sm:block'>
                    <div className='flex space-x-4'>
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={handleActive}
                          aria-current={item.current ? 'page' : undefined}>
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-3 px-2 pb-3 pt-2'>
                  {auth.tokens?.access_token &&
                    navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className={handleActive}
                        aria-current={item.current ? 'page' : undefined}>
                        {item.name}
                      </NavLink>
                    ))}
                  {!auth.tokens?.access_token && (
                    <>
                      <div className='px-4 py-2 text-sm text-gray-800 dark:hover:bg-slate-700 p-3 rounded-md transition-all border-2 border-gray-800 lg:mr-6'>
                        <Link to='/auth/signup' className='text-xl font-semibold text-center block'>
                          Sign Up
                        </Link>
                      </div>
                      <div className='px-4 py-2 text-sm text-white dark:hover:bg-slate-700 p-3 rounded-md transition-all bg-gray-800 lg:mr-6'>
                        <Link to='/auth/signin' className='text-xl font-semibold text-center block'>
                          Sign In
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}

{loadingProducts ? (
<SkeletonLoading />
) : (
<motion.div
layout
initial='hidden'
animate='visible'
variants={gridVariants}
className='mx-auto h-full max-w-[105rem] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 gap-16 relative'>
{currentProducts.map(({ \_id, ...rest }) => {
const item = { ...rest };
return (
<motion.div layout key={\_id} className='group relative rounded-md'>
<div className='aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[23rem]'>
<img
src={item.mainImg.url}
alt={`img alt`}
className='h-full w-full object-cover object-center lg:h-full lg:w-full transition-all overflow-hidden'
/>
</div>
<div className='flex justify-between items-center'>
<Link
to={`/products/${_id}`}
className='mt-3 flex items-center text-2xl font-semibold justify-between text-gray-900 dark:text-white hover:underline'>
<h3>{item.name}</h3>
</Link>
<p className='text-xl font-bold text-gray-800 dark:text-white'>
{formatPrice(item.price)}
</p>
</div>
</motion.div>
);
})}
</motion.div>
)}



  const customProductObject = [
    {
      productOne: (
        <CustomCarousel
          productImage={<img src={`${CartImage}`} alt='' className='rounded-lg h-48 w-96' />}
        />
      ),
    },
    {
      productTwo: (
        <CustomCarousel
          productImage={<img src={`${CartImage}`} alt='' className='rounded-lg h-48 w-96' />}
        />
      ),
    },
  ];

  useEffect(() => {
    handleFetchProduct(id);
  });

  return (
    <motion.div
      layout
      initial='hidden'
      animate='visible'
      className='max-w-9xl mx-auto mt-8'
      variants={gridVariants}>
      <Modal token={tokens?.access_token} />
      {loadingProduct ? (
        <Spinner
          width={60}
          height={60}
          className='absolute left-[50%] top-[50%] translate-[-50%]'
        />
      ) : (
        <Card id='product' className='p-8'>
          <Link to='/products' className='mt-5'>
            <Button
              placeholder='back button'
              className='hover:bg-transparent focus:bg-transparent flex items-center space-x-2 text-xl capitalize'
              variant='text'
              ripple={false}>
              <ChevronLeftIcon className='h-7 stroke-[4]' />
              <span>Back</span>
            </Button>
          </Link>
          <div className=' mx-auto h-full'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 py-12'>
              <motion.div layout>
                <Slider {...productCarouselSettings}>
                  <CustomCarousel
                    productImage={
                      <img
                        src={`${CartImage}`}
                        alt=''
                        className='object-cover object-center aspect-w-4 rounded-lg h-[38rem] lg:h-[40rem] w-full'
                      />
                    }
                  />
                  <CustomCarousel
                    productImage={
                      <img
                        src={`${CartImage}`}
                        alt=''
                        className='object-cover object-center aspect-w-4 rounded-lg h-[38rem] lg:h-[40rem] w-full'
                      />
                    }
                  />
                </Slider>
                <div className='grid grid-cols-4 mt-12 gap-4'>
                  <CustomCarousel
                    productImage={
                      <img src={`${CartImage}`} alt='' className='rounded-lg h-48 w-96' />
                    }
                  />{' '}
                  <CustomCarousel
                    productImage={
                      <img src={`${CartImage}`} alt='' className='rounded-lg h-48 w-96' />
                    }
                  />
                </div>
              </motion.div>
              <motion.div layout>
                <CardBody className='col-span-full md:col-span-1'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <Typography
                        as='h3'
                        className='text-xl text-affiliate-green '
                        placeholder='card title'>
                        Furnished 3 Bedroom Flat
                      </Typography>
                      <Typography placeholder='card sub title'>Product by springboot</Typography>
                    </div>
                    <div>
                      <span className='inline-flex items-center space-x-2'>
                        <Rating
                          value={product?.price}
                          ratedIcon={<RatedIcon className='h-6 w-6 stroke-0 fill-yellow-600' />}
                          unratedIcon={<UnRatedIcon className='h-6 w-6' />}
                          className='mt-4'
                        />
                      </span>
                      <Typography
                        placeholder='product price'
                        className='text-xl  text-affiliate-green'>
                        <span>#600,000</span>
                      </Typography>
                    </div>
                  </div>

                  <div className='mt-16 space-y-10'>
                    <Typography
                      placeholder='product title'
                      as='h3'
                      className='text-2xl font-medium'>
                      About product
                    </Typography>
                    <Typography placeholder='product description' className='font-normal'>
                      Lorem ipsum dolor sit amet consectetur. Faucibus morbi viverra proin vulputate
                      ipsum facilisis tellus. Faucibus vel netus ipsum dignissim faucibus leo etiam.
                      Aliquam gravida duis lorem vel elit morbi. Lorem ipsum dolor sit amet
                      consectetur. Faucibus morbi viverra proin vulputate ipsum facilisis tellus.
                      Faucibus vel netus ipsum dignissim faucibus leo etiam. Aliquam gravida duis
                      lorem vel elit morbi. Lorem ipsum dolor sit amet consectetur. Faucibus morbi
                      viverra proin vulputate ipsum facilisis tellus. Faucibus vel netus ipsum
                      dignissim faucibus leo etiam. Aliquam gravida duis lorem vel elit morbi.
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter>
                  <form action=''>
                    <div className='flex space-x-4 items-center'>
                      <Button
                        variant='gradient'
                        color='blue-gray'
                        className='py-3 px-3 rounded-full'>
                        <MinusIcon className='h-7' />
                      </Button>
                      <Button
                        variant='gradient'
                        color='blue-gray'
                        className='py-3 px-3 rounded-full'>
                        <PlusIcon className='h-7' />
                      </Button>
                    </div>
                  </form>
                </CardFooter>
              </motion.div>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );


<motion.div layout className='relative'>
                  <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                    top seller
                  </span>
                  <header className='h-[30rem] bg-[#d2d2d2] flex items-center justify-center'>
                    <img src={BodySpray} alt='' className='h-60' />
                  </header>
                  <div className='mt-4 space-y-3'>
                    <h3 className='capitalize text-xl font-semibold text-gray-700'>body spray</h3>
                    <p className='text-lg font-medium italic'>$50</p>
                  </div>
                </motion.div>
                <motion.div layout>
                  <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                    <img src={Vitamin} alt='' className='h-60' />
                  </header>
                  <div className='mt-4 space-y-3'>
                    <h3 className='capitalize text-xl font-semibold text-gray-700'>vitamin c</h3>
                    <p className='text-lg font-medium italic'>$50</p>
                  </div>
                </motion.div>
              
                <motion.div layout>
                  <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                    <img src={Sanitizer} alt='' className='h-60' />
                  </header>
                  <div className='mt-4 space-y-3'>
                    <h3 className='capitalize text-xl font-semibold text-gray-700'>sanitizer</h3>
                    <p className='text-lg font-medium italic'>$50</p>
                  </div>
                </motion.div>
                <motion.div layout>
                  <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                    <img src={FaceMask} alt='' className='h-60' />
                  </header>
                  <div className='mt-4 space-y-3'>
                    <h3 className='capitalize text-xl font-semibold text-gray-700'>face mask</h3>
                    <p className='text-lg font-medium italic'>$50</p>
                  </div>
                </motion.div>
                <motion.div layout>
                  <header className='h-[30rem] relative bg-[#d2d2d2] flex items-center justify-center'>
                    <img src={Deodorant} alt='' className='h-60' />
                  </header>
                  <div className='mt-4 space-y-3'>
                    <h3 className='capitalize text-xl font-semibold text-gray-700'>deodorant</h3>
                    <p className='text-lg font-medium italic'>$50</p>
                  </div>
                </motion.div>