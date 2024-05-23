import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { InputField } from '../components/inputs/Input';
import { loginSchema } from '../schema/Schema';
import { useLoginMutation } from '../features/auth/auth.endpoints';
import { setCredentials } from '../features/auth/auth.slice';
import { IconType } from '../components/icon/IconType';
import { SignInInitialValues } from '../types';
import { LocalStorage } from '../util';
import { motion } from 'framer-motion';
import { Button, Typography } from '@material-tailwind/react';
import { GoogleIcon } from '../components/Icons';
import { useAppDispatch } from '../app/hooks';
import { toast } from 'react-toastify';

const initialValues: SignInInitialValues = {
  username: '',
  email: '',
  password: '',
};

const motionConfig = {
  initial: {
    opacity: 0,
    scale: 0,
    x: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const Signin = () => {
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // const redirectPath = location.state.path || '/';

  const [showPassword, setShowPassword] = useState(false);

  const { values, handleSubmit, handleBlur, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, actions) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const response = await loginMutation(values).unwrap();

          const { userData, tokens } = response;

          console.log(response);

          LocalStorage.set('userInfo', userData);
          LocalStorage.set('tokens', tokens);

          dispatch(setCredentials({ userData, tokens, isAuthenticated: true }));

          await new Promise((resolve) => setTimeout(resolve, 1500));
          actions.resetForm();
          navigate('/', { replace: true });
        } catch (error: any) {
          toast.error(error?.data.message || error.error);
        }
      },
    });

  return (
    <motion.div {...motionConfig}>
      <div className='px-10 flex min-h-screen justify-center items-center'>
        <form
          onSubmit={handleSubmit}
          className='max-w-3xl w-full mx-auto border  bg-white rounded-lg px-8 py-6'>
          <legend className='my-5 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent'>
            Sign In
          </legend>

          <Button
            className='relative group bg-white border  border-gray-500  capitalize flex items-center flex-shrink-0 overflow-hidden gap-3 group pr-[72px]'
            size='lg'
            fullWidth>
            <Typography
              as='span'
              className='text-xl text-gray-800 font-medium tracking-wider bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent'>
              Sign in with Google
            </Typography>
            <span className='absolute right-0 top-1/2 -translate-y-1/2 p-6 bg-light-blue-600 group:hover:bg-light-blue-700'>
              <GoogleIcon className='h-6 w-6 fill-white bg-clip-text text-transparent' />
            </span>
          </Button>

          <div className='border-t-2 border-gray-900/10 mt-4'>
            <fieldset className='mb-5 mt-5'>
              <div className='mb-2'>
                <label
                  htmlFor='email'
                  className='block text-xl font-medium leading-6 text-gray-700'>
                  Email address
                </label>
                <div className='mt-2'>
                  <InputField
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    placeholder='enter your email or username here...'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 sm:text-lg font-base sm:leading-6 ${
                      errors.email && touched.email ? 'ring-red-600 ring-[0.15rem]' : ''
                    }`}
                  />
                </div>
              </div>
              {errors.email && touched.email && (
                <small className='text-xl block text-red-600'>{errors.email}</small>
              )}
            </fieldset>

            <fieldset>
              <div className='mb-3'>
                <label
                  htmlFor='password'
                  className='block text-xl font-medium leading-6 text-gray-700'>
                  Password
                </label>
                <div className='mt-2 relative'>
                  <InputField
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='enter your password here...'
                    autoComplete='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 sm:text-lg font-base sm:leading-6 ${
                      errors.password && touched.password ? 'ring-red-600 ring-[0.15rem]' : ''
                    }`}
                  />
                  <IconType
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer text-xl ${
                      showPassword ? 'text-gray-700' : 'text-gray-500'
                    } `}
                  />
                </div>
              </div>
              {errors.password && touched.password && (
                <small className='text-xl block text-red-600'>{errors.password}</small>
              )}
            </fieldset>
          </div>

          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isSubmitting}
              loading={isSubmitting}
              className='rounded-md w-full flex items-center justify-center capitalize bg-light-blue-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70'>
              {isSubmitting ? <span>Signing in...</span> : <span>Sign in</span>}
            </Button>
          </div>
          <p className='mt-4 text-xl font-medium text-gray-600'>
            Don't have an account ?
            <Link to='/register' className='text-[#167ece] ml-2'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};
export default Signin;
