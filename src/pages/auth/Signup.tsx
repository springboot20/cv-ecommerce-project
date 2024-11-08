import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { registerSchema } from "../../schema/Schema";
import { IconType } from "../../components/icon/IconType";
import { SignUpInitialValues } from "../../types";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useRegisterMutation } from "../../features/auth/auth.slice";
import { toast } from "react-toastify";

const initialValues: SignUpInitialValues = {
  username: "",
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

const Signup = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [showPassword, setShowPassword] = useState(false);

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await register(values).unwrap();

        if (response.statusCode.toString().startsWith("2")) {
          toast.success(response.data.message);
          await new Promise((resolve) => setTimeout(resolve, 1500));
          navigate("/", { replace: true });
          actions.resetForm();
        }
      } catch (err: any) {
        toast.error(err.error);
      }
    },
  });

  return (
    <motion.div {...motionConfig}>
      <div className="px-8 flex min-h-screen justify-center items-center bg-[#f2f2f2]">
        <form
          onSubmit={handleSubmit}
          className="max-w-xl w-full mx-auto border bg-white rounded-lg p-6"
        >
          <legend className="my-5 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent">
            Sign Up
          </legend>

          <div className="mt-4">
            <fieldset className="mb-2.5 mt-2">
              <label htmlFor="username" className="text-lg font-normal text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="name"
                  placeholder="enter your name  here..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                    errors.username && touched.username ? "ring-red-600 ring-[0.15rem]" : ""
                  }`}
                />
              </div>
              {errors.username && touched.username && (
                <small className="text-base text-red-600">{errors.username}</small>
              )}
            </fieldset>

            <fieldset className="mb-2.5 mt-2">
              <label htmlFor="username" className="text-lg font-normal text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="enter your email  here..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                    errors.email && touched.email ? "ring-red-600 ring-[0.15rem]" : ""
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <small className="text-base text-red-600">{errors.email}</small>
              )}
            </fieldset>

            <fieldset>
              <label htmlFor="password" className="text-lg font-normal text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
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
                <small className="text-base text-red-600">{errors.password}</small>
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
              {isLoading ? <span>Signing up...</span> : <span>Sign up</span>}
            </Button>
          </div>
          <p className="mt-4 text-lg text-center font-normal text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#167ece]">
              Signin
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};
export default Signup;
