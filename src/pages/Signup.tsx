import { useState } from 'react'
import { useFormik } from 'formik'
import { registerSchema } from '../schema/Schema'
import { useRegisterMutation } from '../features/auth/auth.endpoints'
import { Link, useNavigate } from 'react-router-dom'
import { InputField } from '../components/inputs/Input'
import { IconType } from '../components/icon/IconType'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
// import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { SignUpInitialValues } from '../types'
import { Button } from '@material-tailwind/react'
import { LocalStorage } from '../util'

const initialValues: SignUpInitialValues = {
  username: '',
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  confirmPassword: '',
}

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
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()
  const [registerMutation] = useRegisterMutation()

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...rest } = values
        const [firstname, lastname] = values.username.split(' ')

        const data = {
          ...rest,
          username: {
            firstname,
            lastname,
          },
        }

        const response = await registerMutation(data).unwrap()

        const { userData } = response

        console.log(userData)

        LocalStorage.set('userInfo', userData)

        await new Promise((resolve) => setTimeout(resolve, 1500))
        actions.resetForm()
        navigate('/login', { replace: true })
      } catch (e) {
        console.log(e)
      }
    },
  })
  return (
    <motion.div {...motionConfig}>
      <div className="px-10 md:px-0 flex min-h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex-shrink-0 max-w-3xl w-full mx-auto bg-white border rounded-lg px-8 py-6"
        >
          <div className="space-y-6">
            <div className="border-b border-gray-900/10 pb-6">
              <legend className="my-5 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent">
                Sign Up
              </legend>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full grid sm:grid-cols-2 gap-9">
                  <div className="col-span-full sm:col-span-1">
                    <fieldset className="mb-2">
                      <label
                        htmlFor="firstname"
                        className="block text-xl font-medium leading-6 text-gray-700"
                      >
                        Firstname
                      </label>
                      <div className="mt-2">
                        <InputField
                          type="text"
                          name="firstname"
                          id="firstname"
                          autoComplete="given-name"
                          placeholder="enter your firstname here..."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstname}
                          className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium sm:leading-6 ${
                            errors.firstname && touched.firstname
                              ? 'ring-red-600 ring-[0.15rem]'
                              : ''
                          }`}
                        />
                      </div>
                    </fieldset>
                    {errors.firstname && touched.firstname && (
                      <small className="text-xl block text-red-600">
                        {errors.firstname}
                      </small>
                    )}
                  </div>

                  <div className="col-span-full sm:col-span-1">
                    <fieldset className="mb-2">
                      <label
                        htmlFor="lastname"
                        className="block text-xl font-medium leading-6 text-gray-700"
                      >
                        Lastname
                      </label>
                      <div className="mt-2">
                        <InputField
                          type="text"
                          name="lastname"
                          id="lastname"
                          autoComplete="given-name"
                          placeholder="enter your lastname here..."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastname}
                          className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium sm:leading-6 ${
                            errors.lastname && touched.lastname
                              ? 'ring-red-600 ring-[0.15rem]'
                              : ''
                          }`}
                        />
                      </div>
                    </fieldset>
                    {errors.lastname && touched.lastname && (
                      <small className="text-xl block text-red-600">
                        {errors.lastname}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-span-full">
                  <fieldset className="mb-2">
                    <label
                      htmlFor="Username"
                      className="block text-xl font-medium leading-6 text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <InputField
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="given-name"
                        placeholder="enter your username here..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium sm:leading-6 ${
                          errors.username && touched.username
                            ? 'ring-red-600 ring-[0.15rem]'
                            : ''
                        }`}
                      />
                    </div>
                  </fieldset>
                  {errors.username && touched.username && (
                    <small className="text-xl block text-red-600">
                      {errors.username}
                    </small>
                  )}
                </div>

                <div className="col-span-full">
                  <fieldset className="mb-2">
                    <label
                      htmlFor="email"
                      className="block text-xl font-medium leading-6 text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <InputField
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="enter your email here..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium sm:leading-6 ${
                          errors.email && touched.email
                            ? 'ring-red-600 ring-[0.15rem]'
                            : ''
                        }`}
                      />
                    </div>
                  </fieldset>
                  {errors.email && touched.email && (
                    <small className="text-xl block text-red-600">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="col-span-full">
                  <fieldset className="mb-2">
                    <label
                      htmlFor="password"
                      className="block text-xl font-medium leading-6 text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <InputField
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="password"
                        placeholder="enter your password here..."
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-medium sm:leading-6 ${
                          errors.password && touched.password
                            ? 'ring-red-600 ring-[0.15rem]'
                            : ''
                        }`}
                      />
                      <IconType
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={handleTogglePassword}
                        className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer text-xl ${
                          showPassword ? 'text-gray-700' : 'text-gray-500'
                        } `}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <small className="text-xl block text-red-600">
                        {errors.password}
                      </small>
                    )}
                  </fieldset>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="rounded-md w-full flex items-center justify-center capitalize bg-light-blue-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
            >
              {isSubmitting ? <span>Signing up...</span> : <span>Sign up</span>}
            </Button>
          </div>
          <p className="mt-4 text-xl font-medium text-gray-600">
            Already have an account ?
            <Link to="/login" className="text-[#167ece] ml-2">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  )
}
export default Signup
