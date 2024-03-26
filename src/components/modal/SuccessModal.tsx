import React from 'react';
import { classNames } from '../../helpers';
import CardBase from '../../assets/Card-Base.png';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const SuccessModal: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, setOpen }) => {
  const motionConfig = {
    initial: {
      opacity: 0,
      scale: 1,
      x: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: '-50%',
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className={classNames(open ? 'hidden' : 'block')}>
      <div className='fixed inset-0 w-full min-h-screen bg-black/30 z-20'></div>
      <motion.div
        {...motionConfig}
        className={classNames('fixed w-[40rem] h-[45rem] bg-white top-28 left-1/2 z-30')}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='absolute top-4 right-4 flex h-14 w-14 cursor-pointer bg-white/30  rounded-full items-center justify-center'>
          <XMarkIcon className='h-10 text-white' />
        </button>
        <div className=''>
          <img src={CardBase} alt='' />
        </div>

        <div className='p-8 flex items-center flex-col justify-between space-y-16'>
          <div className='text-center'>
            <h3 className='text-3xl font-semibold'>Order Placed Successfully</h3>
            <p className='text-xl text-gray-700  mt-4 font-medium'>
              Your Order Has Been Placed Successfully We'll Try To Ship It To Your Door Step As Soon
              We Can. Cheers
            </p>
          </div>
          <Link to='/products'>
            <Button className='uppercase text-xl tracking-wider shadow-none rounded-none bg-[#004197]'>
              continue shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
