import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useFormik, FormikTouched, FormikErrors } from 'formik';
import * as yup from 'yup';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import { IconType } from '../../../../components/icon/IconType';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '../../../../hooks/useForm';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../../../../hooks/redux/redux.hooks';
import { RootState } from '../../../../app/store';
import { useEffect, useState } from 'react';
import { useOtp } from '../../../../hooks/useOtp';
import { User } from '../../../../types/redux/auth';
import {
  useForgotPasswordMutation,
  useResetForgotPasswordMutation,
} from '../../../../features/auth/auth.slice';
import { classNames } from '../../../../helpers';

interface InitialValues {
  password: string;
  confirm_password: string;
}

const initialValues: InitialValues = {
  password: '',
  confirm_password: '',
};

export type FormikEvent = {
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  values: InitialValues;
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  touched: FormikTouched<InitialValues>;
  errors: FormikErrors<InitialValues>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
};

const passwordRule = /^(?=.*[a-z])(?=.*\d)(?=.*[-.+@_&])(?=.*[A-Z]*).{6,}$/;

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRule, {
      message:
        'Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ',
    })
    .required('password is required'),

  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export const ResetPassword = () => {
  const [tokenEntered, setTokenEntered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { handleNextStep, handlePrevStep } = useForm();
  const [resetForgotPassword, { isLoading }] = useResetForgotPasswordMutation();
  const {
    values: otpValues,
    handleChange: otpChange,
    handleKeyDown,
    handlePaste,
    formatTime,
    inputRefs,
  } = useOtp();

  const { handleBlur, values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await resetForgotPassword({
          token: otpValues.join(''),
          password: values.password,
        }).unwrap();

        if (response.statusCode.toString().startsWith('2')) {
          toast.success(response.data.message);

          setTimeout(() => handleNextStep(), 1500);
          resetForm();
        }
      } catch (error: any) {

        if ([404, 401, 500].includes(error?.statusCode)) {
          setTimeout(() => handlePrevStep(), 1500);
        }

        throw error
      }
    },
  });

  return (
    <div className='flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full'>
      <div className={classNames('w-full', tokenEntered ? 'max-w-xl' : 'sm:w-fit')}>
        {tokenEntered ? (
          <FormHeader
            icon={<EnvelopeIcon className='h-6 text-gray-600' strokeWidth={2} />}
            title='Set a new password'
            description='Your new password must be different from the previously used passwords.'
          />
        ) : (
          <FormHeader
            icon={<ShieldCheckIcon className='h-6 text-gray-600' strokeWidth={2} />}
            title='Check you inbox'
            description={
              <p className='text-center flex items-center flex-col'>
                <span>We sent verification codes to</span>
                <span className='text-gray-600'>{user?.email}</span>
              </p>
            }
          />
        )}
        <form
          className='w-full flex flex-col h-auto mt-4'
          onSubmit={(e) => tokenEntered && handleSubmit(e)}>
          {tokenEntered ? (
            <Password
              values={values}
              handleChange={handleChange}
              showPassword={showPassword}
              handleSubmit={handleSubmit}
              errors={errors}
              touched={touched}
              isLoading={isLoading}
              handleBlur={handleBlur}
              setShowPassword={setShowPassword}
            />
          ) : (
            <Email
              values={otpValues}
              setTokenEntered={setTokenEntered}
              user={user}
              handleChange={otpChange}
              handleKeyDown={handleKeyDown}
              handlePaste={handlePaste}
              formatTime={formatTime}
              inputRefs={inputRefs}
            />
          )}
        </form>
      </div>
    </div>
  );
};

const Password: React.FC<
  FormikEvent & {
    showPassword: boolean;
    isLoading: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({
  values,
  handleChange,
  showPassword,
  handleSubmit,
  errors,
  touched,
  isLoading,
  handleBlur,
  setShowPassword,
}) => {
  return (
    <div className='flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full'>
      <div className='w-full max-w-xl'>
        <div className=' flex justify-center items-center flex-col'>
          <span className='flex items-center justify-center border size-12 rounded-full bg-white'>
            <ShieldCheckIcon className='h-6 text-gray-600' strokeWidth={2} />
          </span>
          <h2 className='mt-2 text-xl text-center font-semibold text-[#101828]'>
            Set a new password
          </h2>
          <p className='text-center text-[#667085]'>
            Your new Password must be different from the previously used passwords.
          </p>
        </div>
        <form className='w-full flex flex-col h-auto mt-4' onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor='password' className='text-lg font-normal text-gray-700'>
              Password
            </label>
            <div className='mt-2 relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='enter your password here...'
                autoComplete='password'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                  errors.password && touched.password ? 'ring-red-600 ring-[0.15rem]' : ''
                }`}
              />
              <IconType
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer h-5 ${
                  showPassword ? 'text-gray-700' : 'text-gray-500'
                } `}
              />
            </div>
            {errors.password && touched.password && (
              <small className='text-base text-red-600'>{errors.password}</small>
            )}
          </fieldset>

          <fieldset className='mb-2.5 mt-2'>
            <label htmlFor='confirm_password' className='text-lg font-normal text-gray-700'>
              Confirm password
            </label>
            <div className='mt-2 relative'>
              <input
                id='confirm_password'
                name='confirm_password'
                type={showPassword ? 'text' : 'password'}
                autoComplete='name'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='re-enter your password here...'
                value={values.confirm_password}
                className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                  errors.confirm_password && touched.confirm_password
                    ? 'ring-red-600 ring-[0.15rem]'
                    : ''
                }`}
              />
              <IconType
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer h-5 ${
                  showPassword ? 'text-gray-700' : 'text-gray-500'
                } `}
              />
            </div>
            {errors.confirm_password && touched.confirm_password && (
              <small className='text-base text-red-600'>{errors.confirm_password}</small>
            )}
          </fieldset>

          <div className='mt-6'>
            <Button
              type='submit'
              disabled={isLoading}
              loading={isLoading}
              className='rounded-3xl w-full flex items-center justify-center uppercase bg-light-blue-600 px-3 py-3 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70'
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}>
              {isLoading ? <span>Reseting...</span> : <span>Reset Password</span>}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EmailInterface {
  values: string[];
  handleChange: (value: string, index: number) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  formatTime: (time: number) => string;
  inputRefs: React.MutableRefObject<HTMLInputElement[]>;
}

const Email: React.FC<
  EmailInterface & {
    setTokenEntered: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
  }
> = ({
  setTokenEntered,
  user,
  values,
  handleChange,
  handleKeyDown,
  handlePaste,
  formatTime,
  inputRefs,
}) => {
  const timestamp = user?.emailVerificationTokenExpiry;

  const date = new Date(timestamp!);
  const seconds = date.getUTCSeconds(); // Minutes (UTC)
  const [forgotPassword] = useForgotPasswordMutation();
  const [expiresIn, setExpiresIn] = useState<number>(Number(seconds) ?? 60);
  const { handleNextStep } = useForm();

  useEffect(() => {
    if (expiresIn > 0) {
      const expireTime = setInterval(() => {
        setExpiresIn((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(expireTime);
      };
    }
  }, [expiresIn]);

  const handleClick = () => {
    setTokenEntered(true);
    setTimeout(() => handleNextStep(), 1500);
  };

  const handleResendForgotPasswordEmail = async () => {
    try {
      const response = await forgotPassword({
        email: user?.email as string,
      }).unwrap();
      if (response.statusCode.toString().startsWith('2')) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      const defaultMessage = 'An unexpected error occurred. Please try again.';
      const errorMessage =
        error?.data?.message ||
        (error.error && typeof error.error === 'string' ? error.error : defaultMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className='flex items-center justify-between w-full sm:space-x-2'>
        {values.map((v, index) => (
          <fieldset key={index}>
            <label htmlFor='number' className='hidden sr-only'>
              {index}
            </label>
            <input
              id='number'
              type='text'
              value={v}
              maxLength={1}
              inputMode='numeric'
              autoComplete='one-time-code'
              pattern='\d{1}'
              disabled={expiresIn === 0}
              onChange={(event) => handleChange(event.target.value, index)}
              onKeyUp={(event) => handleKeyDown(event, index)}
              ref={(el) => el && (inputRefs.current[index] = el)}
              onPaste={handlePaste}
              className='block h-12 w-12 xs:h-16 xs:w-16 md:h-12 md:w-12 text-center appearance-none px-3 text font-medium rounded-md border-0 py-3 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 outline-none'
            />
          </fieldset>
        ))}
      </div>

      <div className='mt-2 text-gray-700'>
        {expiresIn > 0 ? (
          <span>Expires in : {formatTime(expiresIn)} seconds</span>
        ) : (
          <span className='text-red-500 text-right block'>{formatTime(expiresIn)} expires</span>
        )}
      </div>

      <Button
        type='submit'
        onClick={handleClick}
        className='flex items-center justify-center bg-blue-500 text-white text-sm font-semibold rounded-3xl transform hover:-translate-y-1.5 transition shadow-md hover:bg-blue-400 active:bg-blue-500 focus:ring-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 tracking-wider sm:mt-4 sm:py-2.5 disabled:bg-blue-400 disabled:hover:translate-y-0'
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}>
        <span>continue to reset password</span>
      </Button>

      <div className='flex items-center justify-center space-x-2 mt-2'>
        <p className='text-[#475467] text-sm font-normal'>Didn't recieve the email? </p>
        <Button
          variant='text'
          type='button'
          onClick={handleResendForgotPasswordEmail}
          className='text-blue-500 font-medium p-1 rounded hover:bg-transparent active:bg-transparent'
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}>
          Click to resend
        </Button>
      </div>
    </>
  );
};

const FormHeader: React.FC<{
  icon: JSX.Element;
  title: string;
  description: string | JSX.Element;
}> = ({ icon, title, description }) => (
  <div className='flex justify-center items-center flex-col'>
    <span className='flex items-center justify-center border size-12 rounded-full bg-white'>
      {icon}
    </span>
    <h2 className='mt-2 text-xl text-center font-semibold text-[#101828]'>{title}</h2>
    {typeof description === 'string' ? (
      <p className='text-center text-[#667085]'>{description}</p>
    ) : (
      description
    )}
  </div>
);
