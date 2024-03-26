import { useFormik } from 'formik';
import { InputField } from '../inputs/Input';
import { orderSchema } from '../../schema/Schema';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const CheckOutForm = ({ className }: { className: string }) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      country: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      phone: '',
      saveInfo: false,
    },
    validationSchema: orderSchema,
    onSubmit: onSubmit,
  });

  async function onSubmit() {
    if (values) {
      const btn = document.querySelector('button') as HTMLButtonElement;
      btn.innerHTML = 'checking out....';
      btn.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return (
    <div className={className}>
      <h2 className='my-7 text-3xl font-semibold text-gray-700 uppercase'>checkout</h2>
      <div className='space-y-6'>
        <h3 className='my-7 text-xl font-medium text-gray-700 capitalize'>delivery address</h3>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='cols-span-full md:col-span-1'>
              <InputField
                type='text'
                id='firstname'
                placeholder='first name'
                onChange={handleChange}
                value={values.firstname}
                className='w-full'
              />
            </div>
            <div className='cols-span-full md:col-span-1'>
              <InputField
                type='text'
                id='lastname'
                placeholder='last name'
                onChange={handleChange}
                value={values.lastname}
                className='w-full'
              />
            </div>
          </fieldset>
          <fieldset className='w-full'>
            <InputField
              type='text'
              placeholder='street address'
              className='w-full'
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className='w-full'>
            <InputField
              type='text'
              placeholder='N/A'
              className='w-full'
              onChange={handleChange}
              value={values.phone}
            />
          </fieldset>
          <fieldset className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='cols-span-full md:col-span-1'>
              <InputField
                type='text'
                id='zipcode'
                placeholder='zipcode'
                onChange={handleChange}
                value={values.zipcode}
                className='w-full'
              />
            </div>
            <div className='cols-span-full md:col-span-1'>
              <InputField
                type='tel'
                id='fa-phone'
                placeholder='phone number'
                onChange={handleChange}
                value={values.phone}
                className='w-full'
              />
            </div>
          </fieldset>
          <fieldset className='w-full'>
            <InputField
              type='text'
              id='country'
              placeholder='country'
              onChange={handleChange}
              value={values.country}
              className='w-full'
            />
          </fieldset>
        </form>

        <div className='flex items-center justify-between'>
          <Link to='' className='flex items-center space-x-2'>
            <ChevronLeftIcon className='h-7 stroke-2' />
            <span className='text-lg uppercase font-thin'>go back to cart</span>
          </Link>
          <Button className='w-1/2 py-5 capitalize text-xl font-semibold rounded-none bg-[#e2342d]'>
            save and continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
