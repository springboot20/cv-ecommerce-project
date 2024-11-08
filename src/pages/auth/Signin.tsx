import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { loginSchema } from "../../schema/Schema";
import { IconType } from "../../components/icon/IconType";
import { SignInInitialValues } from "../../types";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useLoginMutation } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";

const initialValues: SignInInitialValues = {
  email: "",
  password: "",
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
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      await login(values)
        .unwrap()
        .then(async (res) => {
          toast.success(res.data.message);
          await Promise.resolve(setTimeout(() => navigate("/"), 2000));
          actions.resetForm();
        })
        .catch((error) => {
          toast.error(error.error);
        });
    },
  });

  return (
    <motion.div {...motionConfig}>
      <div className="px-8 flex min-h-screen justify-center items-center bg-[#f2f2f2]">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl w-full mx-auto border-2 bg-white rounded-lg p-6"
        >
          <legend className="my-5 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent">
            Sign In
          </legend>

          <div className="mt-4">
            <fieldset className="mb-3 mt-5">
              <label htmlFor="email" className="text-lg font-normal text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="name"
                  placeholder="enter your email address here..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                    errors.email && touched.email ? "ring-red-600 ring-[0.15rem]" : ""
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <small className="text-base block text-red-600">{errors.email}</small>
              )}
            </fieldset>

            <fieldset>
              <label htmlFor="password" className="text-lg font-normal text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter your password here..."
                  autoComplete="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                    errors.password && touched.password ? "ring-red-600 ring-[0.15rem]" : ""
                  }`}
                />
                <IconType
                  icon={showPassword ? faEye : faEyeSlash}
                  onClick={() => setShowPassword(!showPassword)}
                  className={`eye-icon absolute top-[50%] translate-y-[-50%] right-4 cursor-pointer h-5 ${
                    showPassword ? "text-gray-700" : "text-gray-500"
                  } `}
                />
              </div>
              {errors.password && touched.password && (
                <small className="text-base block text-red-600">{errors.password}</small>
              )}
            </fieldset>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="rounded-md w-full flex items-center justify-center uppercase bg-light-blue-600 px-3 py-3 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
            >
              {isLoading ? <span>Signing in...</span> : <span>Sign in</span>}
            </Button>
          </div>
          <p className="mt-4 text-lg text-center font-normal text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#167ece]">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};
export default Signin;
