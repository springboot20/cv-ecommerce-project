import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { loginSchema } from "../../../schema/Schema";
import { IconType } from "../../../components/icon/IconType";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useAdminLoginMutation } from "../../../features/auth/auth.slice";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/redux/redux.hooks";
import { setCredentials } from "../../../features/auth/auth.reducer";

interface SignInInitialValues {
  email: string;
  password: string;
}

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

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, actions) => {
      await adminLogin(values)
        .unwrap()
        .then(async (res) => {
          const { tokens, user } = res.data;
          dispatch(setCredentials({ tokens, admin: user }));

          toast.success(res.data.message);
          await Promise.resolve(setTimeout(() => navigate("/admin/products/overview"), 2000));
          actions.resetForm();
        })
        .catch((error) => {
          toast.error(error.error);
        });
    },
  });

  return (
    <motion.div {...motionConfig}>
      <div className="flex min-h-screen justify-center items-center flex-shrink-0">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full mx-auto border-2 bg-white rounded-lg p-4 sm:p-6"
        >
          <legend className="my-2 text-center font-semibold text-3xl bg-gradient-to-l from-red-700 to-light-blue-500 bg-clip-text text-transparent">
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
              className="rounded-md w-full flex items-center justify-center uppercase bg-light-blue-600 px-3 py-2.5 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isLoading ? <span>Signing in...</span> : <span>Sign in</span>}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
export default AdminLogin;
