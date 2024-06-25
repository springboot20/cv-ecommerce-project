import { useState } from 'react'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { InputField } from '../components/inputs/Input'
import { loginSchema } from '../schema/Schema'
import { IconType } from '../components/icon/IconType'
import { SignInInitialValues } from '../types'
import AuthService from '../api/AuthService'
import { motion } from 'framer-motion'
import { Button } from '@material-tailwind/react'
// import { useAuth } from '../hooks/useAuth'

const initialValues: SignInInitialValues = {
  email: '',
  password: '',
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

const Signin = () => {
  const navigate = useNavigate()
  // const { createToken } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await AuthService.login(values)

        if (response.status.toString().startsWith('2')) {
          await Promise.resolve(setTimeout(() => navigate('/home'), 1200))

          actions.resetForm()
        }

        console.log(response)
      } catch (err) {
        console.log(err)
        if (err instanceof Error) {
          console.log(`Error occur when signing: ${err.message}`)
        }
      }
    },
  })

  return (
    <motion.div {...motionConfig}>
      <div className="px-10 flex min-h-screen justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl w-full mx-auto border bg-white rounded-lg px-8 py-6"
        >
          <legend className="my-5 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent">
            Sign In
          </legend>

          <div className="mt-4">
            <fieldset className="mb-5 mt-5">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium leading-6 text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <InputField
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="name"
                    placeholder="enter your email address here..."
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 sm:text-lg font-base sm:leading-6 ${
                      errors.email && touched.email
                        ? 'ring-red-600 ring-[0.15rem]'
                        : ''
                    }`}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div className="mb-3">
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
                    placeholder="enter your password here..."
                    autoComplete="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 sm:text-lg font-base sm:leading-6 ${
                      errors.password && touched.password
                        ? 'ring-red-600 ring-[0.15rem]'
                        : ''
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
                <small className="text-xl block text-red-600">
                  {errors.password}
                </small>
              )}
            </fieldset>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="rounded-md w-full flex items-center justify-center capitalizet bg-light-blue-600 px-3 py-3 text-xl font-semibold text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
            >
              {isSubmitting ? <span>Signing in...</span> : <span>Sign in</span>}
            </Button>
          </div>
          <p className="mt-4 text-xl font-medium text-gray-600">
            Don't have an account ?
            <Link to="/register" className="text-[#167ece] ml-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  )
}
export default Signin
