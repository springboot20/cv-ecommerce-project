import { Button, Radio, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Shoe from '../assets/running-shoes-sneakers.png';
import { SuccessModal } from '../../../components/modal/SuccessModal';
import { useState } from 'react';

 const Payment = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <SuccessModal open={open} setOpen={setOpen} />
      <div className='container mx-auto px-12 max-w-9xl mb-12 mt-40'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4 mt-10 '>
            <h2 className='text-3xl font-semibold text-gray-700 uppercase'>checkout</h2>
            <div className='border rounded-xl flex flex-col'>
              <div className='py-4 px-6 border-b-2 border-gray-200/60'>
                <Radio
                  crossOrigin={'anonymous'}
                  name='terms'
                  color='red'
                  label={
                    <Typography
                      color='blue-gray'
                      className='flex font-medium text-blue-gray-500 capitalize ml-2 text-xl'>
                      bitcoin
                    </Typography>
                  }
                />
              </div>
              <div className='py-4 px-6 border-b-2 border-gray-200/60'>
                <Radio
                  crossOrigin={'anonymous'}
                  name='terms'
                  color='red'
                  label={
                    <Typography
                      color='blue-gray'
                      className='flex font-medium text-blue-gray-500 capitalize ml-2 text-xl'>
                      apple wallet
                    </Typography>
                  }
                />
              </div>
              <div className='py-4 px-6 border-b-2 border-gray-200/60'>
                <Radio
                  crossOrigin={'anonymous'}
                  name='terms'
                  color='red'
                  label={
                    <Typography
                      color='blue-gray'
                      className='flex font-medium text-blue-gray-500 capitalize ml-2 text-xl'>
                      paypal
                    </Typography>
                  }
                />
              </div>
              <div className='py-4 px-6'>
                <Radio
                  crossOrigin={'anonymous'}
                  name='terms'
                  color='red'
                  label={
                    <Typography
                      color='blue-gray'
                      className='flex font-medium text-blue-gray-500 capitalize ml-2 text-xl'>
                      debit / credit card
                    </Typography>
                  }
                />
              </div>
            </div>
            <div className='space-y-3'>
              <h2 className='text-xl font-medium text-gray-700 capitalize'>delivery address</h2>
              <div className='space-y-8'>
                <form onSubmit={() => alert('submitted')} className='space-y-5'>
                  <fieldset className='w-full'>
                    <InputField type='text' placeholder='street address' className='w-full py-4' />
                  </fieldset>
                  <fieldset className='w-full'>
                    <InputField
                      type='text'
                      id='country'
                      placeholder='country'
                      className='w-full py-4'
                    />
                  </fieldset>
                  <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='cols-span-full md:col-span-1'>
                      <InputField
                        type='text'
                        id='firstname'
                        placeholder='first name'
                        className='w-full py-4'
                      />
                    </div>
                    <div className='cols-span-full md:col-span-1'>
                      <InputField
                        type='text'
                        id='lastname'
                        placeholder='last name'
                        className='w-full py-4'
                      />
                    </div>
                  </fieldset>
                </form>
                <div className='flex items-center justify-between'>
                  <Link to='' className='flex items-center space-x-2'>
                    <ChevronLeftIcon className='h-7 stroke-2' />
                    <span className='text-lg uppercase font-thin'>go back to cart</span>
                  </Link>
                  <Button
                    onClick={() => setOpen((prev) => !prev)}
                    className='w-1/2 py-4 capitalize text-xl font-semibold rounded-none bg-[#e2342d]'>
                    pay $50
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img src={Shoe} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment