import React from 'react';
import { classNames } from '../../../helpers';
import { FormikEvent } from '../../../types/formik';
import countriesData from '../../../data/countries';

export const ShippingInformation: React.FC<FormikEvent> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
}) => {
  return (
    <>
      <fieldset className='pb-8 border-b'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-medium capitalize text-gray-600 mb-3'>contact information</h1>
        </div>

        <div className='space-y-1.5'>
          <label
            htmlFor='email'
            className='capitalize text-sm font-normal text-gray-700 sm:text-base'>
            email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='contact address'
            className={classNames(
              'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
              errors?.email && touched?.email ? 'ring-red-600 ring-[0.15rem]' : ''
            )}
          />
          {errors?.email && touched?.email && (
            <small className='text-base text-red-600'>{errors.email}</small>
          )}
        </div>
      </fieldset>

      <div className='pt-5'>
        <h1 className='text-xl font-medium capitalize text-gray-600 mb-3'>shipping information</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <fieldset className='col-span-full sm:col-span-1'>
            <label htmlFor='firstname' className='text-sm font-normal text-gray-700 sm:text-base'>
              First name
            </label>
            <input
              type='text'
              name='firstname'
              id='firstname'
              value={values.firstname}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='first name'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.firstname && touched?.firstname ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.firstname && touched?.firstname && (
              <small className='text-base text-red-600'>{errors.firstname}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full sm:col-span-1'>
            <label htmlFor='lastname' className='text-sm font-normal text-gray-700 sm:text-base'>
              Last name
            </label>
            <input
              type='text'
              name='lastname'
              id='lastname'
              value={values.lastname}
              onChange={handleChange}
              placeholder='last name'
              onBlur={handleBlur}
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.lastname && touched?.lastname ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.lastname && touched?.lastname && (
              <small className='text-base text-red-600'>{errors.lastname}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full'>
            <label
              htmlFor='address_line_one'
              className='capitalize text-sm font-normal text-gray-700 sm:text-base'>
              address
            </label>
            <input
              type='text'
              name='address_line_one'
              id='address_line_one'
              value={values.address_line_one}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='address'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.address_line_one && touched?.address_line_one
                  ? 'ring-red-600 ring-[0.15rem]'
                  : ''
              )}
            />
            {errors?.address_line_one && touched?.address_line_one && (
              <small className='text-base text-red-600'>{errors.address_line_one}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full'>
            <label
              htmlFor='address_line_two'
              className='text-sm font-normal text-gray-700 sm:text-base'>
              Apartment, suite, etc.
            </label>
            <input
              type='text'
              name='address_line_two'
              id='address_line_two'
              value={values.address_line_two}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='apartment, suite, etc'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.address_line_two && touched?.address_line_two
                  ? 'ring-red-600 ring-[0.15rem]'
                  : ''
              )}
            />
            {errors?.address_line_two && touched?.address_line_two && (
              <small className='text-base text-red-600'>{errors.address_line_two}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full sm:col-span-1'>
            <label
              htmlFor='city'
              className='text-sm capitalize font-normal text-gray-700 sm:text-base'>
              city
            </label>
            <input
              type='text'
              name='city'
              id='city'
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='city'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.city && touched?.city ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.city && touched?.city && (
              <small className='text-base text-red-600'>{errors.city}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full sm:col-span-1'>
            <label
              htmlFor='country'
              className='text-sm capitalize font-normal text-gray-700 sm:text-base'>
              country
            </label>
            <select
              name='country'
              id='country'
              value={values.country}
              onChange={handleChange}
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.country && touched?.country ? 'ring-red-600 ring-[0.15rem]' : ''
              )}>
              <option>select your country</option>

              {React.Children.toArray(
                countriesData.map((country) => {
                  return <option value={country.name}>{country.name}</option>;
                })
              )}
            </select>
            {errors?.country && touched?.country && (
              <small className='text-base text-red-600'>{errors.country}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full sm:col-span-1'>
            <label
              htmlFor='state'
              className='text-sm capitalize font-normal text-gray-700 sm:text-base'>
              state / province
            </label>
            <input
              type='text'
              name='state'
              id='state'
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='state'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.state && touched?.state ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.state && touched?.state && (
              <small className='text-base text-red-600'>{errors.state}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full sm:col-span-1'>
            <label htmlFor='zipcode' className='text-sm font-normal text-gray-700 sm:text-base'>
              Postal code
            </label>
            <input
              name='zipcode'
              id='zipcode'
              type='number'
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='12345'
              className={classNames(
                'block w-full appearance-none leading-normal rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.zipcode && touched?.zipcode ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.zipcode && touched?.zipcode && (
              <small className='text-base text-red-600'>{errors.zipcode}</small>
            )}
          </fieldset>

          <fieldset className='col-span-full'>
            <label
              htmlFor='phone'
              className='capitalize text-sm font-normal text-gray-700 sm:text-base'>
              phone
            </label>
            <input
              type='tel'
              name='phone'
              id='phone'
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='phone'
              className={classNames(
                'block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400',
                errors?.phone && touched?.phone ? 'ring-red-600 ring-[0.15rem]' : ''
              )}
            />
            {errors?.phone && touched?.phone && (
              <small className='text-base text-red-600'>{errors.phone}</small>
            )}
          </fieldset>
        </div>
      </div>
    </>
  );
};
