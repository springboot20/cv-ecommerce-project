import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { registerSchema } from "../../../../schema/Schema";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { useRegisterMutation } from "../../../../features/auth/auth.slice";
import { toast } from "react-toastify";
import { UserIcon } from "@heroicons/react/24/outline";
import { useForm } from "../../../../hooks/useForm";

type SignUpInitialValues = {
  email: string;
  username: string;
  phone_number: string;
};

const initialValues: SignUpInitialValues = {
  username: "",
  email: "",
  phone_number: "",
};

export const Details = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const { handleNextStep } = useForm();

  const { values, handleSubmit, handleBlur, handleChange, touched, errors } = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      console.log(values);

      await register(values)
        .unwrap()
        .then(async (response) => {
          toast.success(response.data.message);
          await Promise.resolve(setTimeout(() => handleNextStep(), 1500));
          actions.resetForm();
        })
        .catch((error) => {
          toast.error(error.error || error.data.message);
        });
    },
  });

  return (
    <div className="flex justify-center items-center px-2 sm:px-8 lg:px-0 flex-1 w-full">
      <div className="w-full max-w-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <UserIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">Your details</h2>
          <p className="text-center flex items-center flex-col">
            <span>Welcome Ya! Please set your information.</span>
          </p>
        </div>

        <motion.form
          id="form"
          onSubmit={handleSubmit}
          className="max-w-xl w-full mx-auto rounded-lg p-6"
        >
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
                placeholder="enter your email here..."
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

          <fieldset className="mb-2.5 mt-2">
            <label htmlFor="phone_number" className="text-lg font-normal text-gray-700">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                autoComplete="phone_number"
                placeholder="+(234) 708 8680 7968"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone_number}
                className={`block w-full rounded-md border-0 py-3 px-3  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                  errors.phone_number && touched.phone_number ? "ring-red-600 ring-[0.15rem]" : ""
                }`}
              />
            </div>
            {errors.phone_number && touched.phone_number && (
              <small className="text-base text-red-600">{errors.phone_number}</small>
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
              {isLoading ? <span>continuing...</span> : <span>Continue</span>}
            </Button>
          </div>
          <p className="mt-4 text-lg text-center font-normal text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#167ece]">
              Signin
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};
