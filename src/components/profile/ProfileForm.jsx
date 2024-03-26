/** @format */

import React, { useState } from 'react';
import { useFormik } from 'formik';
import CustomInput from '../inputField/CustomInput';
import { Axios } from '../../Api/Axios';
import { useAuth } from '../../util/AuthContext';
import { useUser } from '../../context/user/UserContext';
import Button from '../icon/Button';
import { CountriesData } from '../data/countriesStore';
import { updateSchema } from '../schema/Schema';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  country: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
};

const ProfileForm = () => {
  const [file, setFile] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files[0];
    setFile(files);
  };

  const { token } = useAuth();
  const {
    user: { _id },
  } = useUser();

  const { handleSubmit, values, errors, touched, isSubmitting, handleChange, handleBlur } = useFormik({
    initialValues,
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      console.log(values);
      await updateProfile(values);
    },
  });

  const updateProfile = async (values) => {
    try {
      const response = await Axios.patch(`/users/${_id}`, values, {
        header: { Authorization: `Bearer ${token?.accessToken}` },
      });
      const data = response.data;

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center left-[20rem] w-[calc(100%-20rem)] lg:w-[calc(100%-20rem)] relative mt-10'>
      <form onSubmit={handleSubmit} className='max-w-7xl w-full bg-white rounded-lg'>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 pb-10 border-b border-b-gray-900/25'>
          <div className='sm:col-span-full md:col-span-3'>
            <div className='flex justify-between'>
              <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>First Name</label>
              {errors.firstName && touched.firstName && (
                <small className='text-xl block text-red-600'>{errors.firstName}</small>
              )}
            </div>
            <CustomInput
              cls='mb-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.firstName && touched.firstName ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.firstName}
              id='firstName'
              placeholder='enter your new first name to update...'
            />
          </div>
          <div className='sm:col-span-full md:col-span-3'>
            <div className='flex justify-between items-center'>
              <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>Last Name</label>
              {errors.lastName && touched.lastName && (
                <small className='text-xl block text-red-600'>{errors.lastName}</small>
              )}
            </div>
            <CustomInput
              cls='mb-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.lastName && touched.lastName ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.lastName}
              id='lastName'
              placeholder='enter your new last name to update...'
            />
          </div>
          <div className='col-span-full'>
            <div className='flex justify-between'>
              <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>Email</label>
              {errors.email && touched.email && <small className='text-xl block text-red-600'>{errors.email}</small>}
            </div>
            <CustomInput
              cls='mt-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.email && touched.email ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.email}
              id='email'
              placeholder='enter your new email address to update...'
            />
          </div>
          <div className='col-span-full'>
            <label htmlFor='country' className='block text-xl font-semibold leading-6 text-gray-900'>
              Country
            </label>
            <div className='mt-2'>
              <select
                id='country'
                name='country'
                autoComplete='country-name'
                value={values.country}
                onChange={handleChange}
                className='block rounded-md border-0 py-4 w-full text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6'>
                <option>Select your country</option>
                {CountriesData.map(({ name, code }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-span-full'>
            <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>Street Address</label>
            <CustomInput
              cls='mt-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.streetAddress && touched.streetAddress ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.streetAddress}
              id='streetAddress'
              placeholder='enter your new email address to update...'
            />
          </div>
          <div className='col-span-full lg:col-span-2 sm:col-start-1'>
            <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>City</label>
            <CustomInput
              cls='mt-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.city && touched.city ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.city}
              id='city'
              placeholder='enter your new city to update...'
            />
          </div>
          <div className='col-span-full lg:col-span-2'>
            <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>State</label>
            <CustomInput
              cls='mt-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.state && touched.state ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.state}
              id='state'
              placeholder='enter your new state to update...'
            />
          </div>
          <div className='col-span-full lg:col-span-2'>
            <label className='block text-xl font-semibold leading-6 text-gray-900 mb-1'>ZipCode</label>
            <CustomInput
              cls='mt-2'
              onChange={handleChange}
              onBlur={handleBlur}
              className={`block w-full rounded-md border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none transition-all focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg font-medium sm:leading-6 ${
                errors.zipCode && touched.zipCode ? 'ring-red-600 ring-[0.15rem]' : ''
              }`}
              value={values.zipCode}
              id='zipCode'
              placeholder='enter your new zip code to update...'
            />
          </div>

          <div className='col-span-full'>
            <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
              Cover photo
            </label>
            <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
              <div className='text-center'>
                {file ? (
                  <img src={URL.createObjectURL(file)} alt='' className='rounded-full h-28 w-28 object-cover mx-auto' />
                ) : (
                  <svg
                    className='mx-auto h-12 w-12 text-gray-300'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    aria-hidden='true'>
                    <path
                      fillRule='evenodd'
                      d='M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z'
                      clipRule='evenodd'></path>
                  </svg>
                )}
                <div className='mt-4 flex items-end leading-6 text-gray-600'>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer bg-white font-semibold text-indigo-600 hover:underline hover:text-indigo-500'>
                    <span className='block text-lg'>Upload a file</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      accept='image/*'
                      className='sr-only'
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          type='submit'
          className='text-white px-8 py-4 bg-gray-800 rounded-lg w-full hover:bg-gray-600 text-lg font-medium disabled:opacity-75 mt-6'
          disabled={isSubmitting}>
          {isSubmitting ? 'Profile updating...' : 'Update Profile'}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
