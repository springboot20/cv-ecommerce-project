import { Link } from 'react-router-dom';
import BusinessMan from '../assets/cover_img.png';
import Bg from '../assets/Bg.png';
import { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <main className='mt-40 relative lg:h-[calc(70vh-10rem)] grid place-items-center place-content-center bg-[#F8F8F8]'>
        <div className='mx-auto max-w-9xl px-8 lg:px-0 py-6'>
          <div className='flex flex-col lg:flex-row gap-10'>
            <div className='flex items-start flex-col justify-between'>
              <div className='space-y-5'>
                <h1 className='text-7xl font-bold uppercase leading-snug text-[#3a408c]'>
                  Providing Services at your Door
                </h1>
                <p className='text-2xl font-medium text-gray-700'>
                  <small className='text-3xl font-semibold text-gray-800'>MACC Essentials</small>{' '}
                  has an important role in making supplies and services available to customers and
                  their patients during this critical time. This includes services from various
                  domains. Our aim is to aid you. As much we can.
                </p>
              </div>
              <Link
                to={'#'}
                className='py-4 inline-block px-14 text-xl font-bold bg-red-500 text-white mt-8'>
                Learn more
              </Link>
            </div>
            <div className=''>
              <img src={BusinessMan} className='rounded-xl max-w-[30rem]' />
            </div>
          </div>
        </div>
      </main>

      <section className='mt-8'>
        <div className='mx-auto max-w-9xl px-8 lg:px-0'>
          <h1 className='text-center text-4xl font-bold uppercase space-x-3'>
            <span className='text-[#e2342d]'>new</span>
            <span className='text-[#3a408c]'>products</span>
          </h1>

          <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 mt-4'>
            <div className='h-[34rem] relative bg-[#d2d2d2]'>
              <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                top seller
              </span>
            </div>
            <div className='h-[34rem] relative  bg-[#d2d2d2]'></div>
            <div className='h-[34rem] relative  bg-[#d2d2d2]'></div>
          </div>
        </div>
      </section>

      <section className='mt-4'>
        <div className='mx-auto max-w-9xl px-8 lg:px-0'>
          <div className='flex items-start flex-col lg:flex-row gap-5 mt-10'>
            <div className='w-full lg:max-w-fit'>
              <img src={Bg} className='rounded-xl w-full lg:h-[40rem] block' />
            </div>
            <div className='w-full flex-1'>
              <div className='flex items-center justify-between w-full'>
                <h2 className='text-2xl space-x-1 font-bold uppercase'>
                  <span className='text-[#e2342d]'>macc</span>
                  <span className='text-[#4a4b4d]'>weekly discount</span>
                </h2>
                <button className='py-2.5 px-3 text-sm font-medium text-gray-700 bg-[#d2d2d2]'>
                  View all
                </button>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='h-[36rem] bg-[#d2d2d2] relative'>
                  <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                    20% off
                  </span>
                </div>
                <div className='h-[36rem] bg-[#d2d2d2] relative'>
                  <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                    20% off
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-4 mb-4'>
        <div className='mx-auto max-w-9xl px-8 lg:px-0'>
          <div className='flex items-start flex-col lg:flex-row gap-5 mt-10'>
            <div className='w-full flex-1'>
              <div className='flex items-center justify-between w-full'>
                <h2 className='text-2xl space-x-1 font-bold uppercase'>
                  <span className='text-[#e2342d]'>macc</span>
                  <span className='text-[#4a4b4d]'>to selling</span>
                </h2>
                <button className='py-2.5 px-3 text-sm font-medium text-gray-700 bg-[#d2d2d2]'>
                  View all
                </button>
              </div>
              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='h-[36rem] bg-[#d2d2d2] relative '>
                  <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                    20% off
                  </span>
                </div>
                <div className='h-[36rem] bg-[#d2d2d2] relative '>
                  <span className='absolute py-1.5 px-12 bg-[#e2342d] text-white text-xl font-semibold top-0 right-0 uppercase'>
                    20% off
                  </span>
                </div>
              </div>
            </div>
            <div className='w-full lg:max-w-fit'>
              <img src={Bg} className='rounded-xl w-full lg:h-[40rem] block' />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Home;
