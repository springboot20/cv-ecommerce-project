import { Link } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { FaceBookIcon, Linkedin, Instagram, TwitterIcon } from './Icons';

export const Footer = () => {
  const footerLinks = [
    {
      title: 'About',
      url: '#',
    },
    {
      title: 'Contact',
      url: '#',
    },
    {
      title: 'FAQ',
      url: '#',
    },
  ];

  const footerRoutes = [
    {
      title: 'Home',
      to: '/home',
    },
    {
      title: 'Collection',
      to: '#',
    },
    {
      title: 'Products',
      to: '#',
    },
  ];

  return (
    <footer className='mt-6 bg-white p-10'>
      <div className='max-w-8xl flex mx-auto flex-col space-y-10'>
        <div className='flex flex-shrink-0 items-start justify-between space-x-3'>
          <span className='logo-name text-gray-800 space-x-2 text-3xl font-semibold'>
            <span className='text-[#e2342d] inline-block'>Cart</span>
            <span className='text-[#3a408c] inline-block'>Shop</span>
          </span>

          <div className='flex flex-col items-start space-y-5'>
            {footerRoutes.map((item) => (
              <Link key={item.title} to={item.to} className={'text-xl font-medium text-[#4a4b4d]'}>
                {item.title}
              </Link>
            ))}
          </div>

          <div className='flex flex-col items-start space-y-5'>
            {footerLinks.map((item) => (
              <Link key={item.title} to={item.url} className={'text-xl font-medium text-[#4a4b4d]'}>
                {item.title}
              </Link>
            ))}
          </div>

          <div className='flex flex-col items-start space-y-6 w-[30rem]'>
            <p className='text-xl text-[#4a4b4d] font-medium'>
              Be the first to know about our biggest and best sales. We'll never send more than one
              email a month.
            </p>

            <div className='flex items-center relative w-full'>
              <input
                type='email'
                className='border-0 border-b focus:!outline-0 border-[#4a4b4d] !outline-none flex-1 w-full'
                placeholder='ENTER YOUR EMAIl'
              />
              <EnvelopeIcon className='h-10 w-10 text-[#4a4b4d] absolute top-1/2 -translate-y-1/2 right-2' />
            </div>

            <div className='flex items-center space-x-4'>
              <span className='flex items-center justify-center h-12 w-12 rounded-full bg-[#004197] cursor-pointer'>
                <TwitterIcon className='fill-none stroke-white stroke-0 h-6' />
              </span>
              <span className='flex items-center justify-center h-12 w-12 rounded-full bg-[#004197] cursor-pointer'>
                <Linkedin className='fill-none stroke-white stroke-0 h-6' />
              </span>
              <span className='flex items-center justify-center h-12 w-12 rounded-full bg-[#004197] cursor-pointer'>
                <FaceBookIcon className='fill-none stroke-white stroke-0 h-6' />
              </span>
              <span className='flex items-center justify-center h-12 w-12 rounded-full bg-[#004197] cursor-pointer'>
                <Instagram className='fill-none stroke-white stroke-0 h-6' />
              </span>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <h3 className='text-[#4a4b4d] text-xl font-medium capitalize'>all rights are reserved</h3>
        </div>
      </div>
    </footer>
  );
};
