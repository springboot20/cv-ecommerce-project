import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreatePasswordMutation } from "../../../../features/auth/auth.slice";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IconType } from "../../../../components/icon/IconType";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface InitialValues {
  password: string;
  confirm_password: string;
}

const initialValues: InitialValues = {
  password: "",
  confirm_password: "",
};

const passwordRule = /^(?=.*[a-z])(?=.*\d)(?=.*[-.+@_&])(?=.*[A-Z]*).{6,}$/;

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(passwordRule, {
      message:
        "Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ",
    })
    .required("password is required"),

  confirm_password: yup
    .string()
    .matches(passwordRule, {
      message:
        "Password must be at least 8 digits characters long and contain at least one uppercase letter, one lowercase letter, and one number ",
    })
    .required("password is required"),
});

export const Password = () => {
  const [createPassword, { isLoading }] = useCreatePasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { handleBlur, values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await createPassword({ password: values.password }).unwrap();

        toast.success(response.data.message);
        await Promise.resolve(setTimeout(() => {}, 1500));
        resetForm();
      } catch (error: any) {
        const errorMessage =
          error.error ||
          (error.data && typeof error.data.message === "string"
            ? error.data.message
            : JSON.stringify(error.data?.message));
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full max-w-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <ShieldCheckIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">Set a password</h2>
          <p className="text-center flex items-center flex-col">
            <span>We sent verification codes to</span>
          </p>
        </div>
        <form className="w-full flex flex-col h-auto mt-4" onSubmit={handleSubmit}>
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

          <fieldset className="mb-2.5 mt-2">
            <label htmlFor="confirm_password" className="text-lg font-normal text-gray-700">
              Confirm password
            </label>
            <div className="mt-2 relative">
              <input
                id="confirm_password"
                name="confirm_password"
                type={showPassword ? "text" : "password"}
                autoComplete="name"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="re-enter your password here..."
                value={values.confirm_password}
                className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                  errors.confirm_password && touched.confirm_password
                    ? "ring-red-600 ring-[0.15rem]"
                    : ""
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
            {errors.confirm_password && touched.confirm_password && (
              <small className="text-base text-red-600">{errors.confirm_password}</small>
            )}
          </fieldset>

          <div className="mt-6">
            <Button
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              className="rounded-md w-full flex items-center justify-center uppercase bg-light-blue-600 px-3 py-3 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isLoading ? <span>Reseting...</span> : <span>Reset Password</span>}
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
    </div>
  );
};
