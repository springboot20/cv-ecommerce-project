import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { forgotSchema } from "../../../schema/Schema";
import { useFormik } from "formik";
import { ForgotPasswordModal } from "../../../components/modal/ForgotModal";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForgotPasswordMutation } from "../../../features/auth/auth.slice";
import { toast } from "react-toastify";

const Forgot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [forgotPasword, { isLoading }] = useForgotPasswordMutation();

  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: async (values) => {
      try {
        const response = await forgotPasword({ email: values.email }).unwrap();

        const { message, statusCode } = response;

        if (statusCode.toString().startsWith("2")) {
          await Promise.resolve(setTimeout(() => setIsOpen(true), 2000));
          toast.success(message);
        }
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
    <Fragment>
      <ForgotPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="flex flex-col justify-center items-center min-h-screen p-3 md:p-0">
        <div className="mt-10 w-full bg-white rounded-lg p-4 sm:p-6 md:max-w-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-xl">
            <UserCircleIcon className="mx-auto h-12 w-auto text-blue-600" />
            <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">
              Enter your email to reset your password
            </h2>
          </div>
          <form action="" onSubmit={handleSubmit} className="mt-4">
            <fieldset>
              <label htmlFor="email" className="text-lg font-normal text-gray-700">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  placeholder="enter your email..."
                  className={`block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-light-blue-600 text-sm ${
                    errors.email && touched.email ? "ring-red-600 ring-[0.15rem]" : ""
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <small className="text-base block text-red-600">{errors.email}</small>
              )}
            </fieldset>

            <Button
              type="submit"
              disabled={!isLoading}
              loading={isLoading}
              className="rounded-md w-full flex items-center justify-center uppercase mt-4 bg-light-blue-600 px-3 py-3 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {isLoading ? <span>sending...</span> : <span>Send</span>}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Forgot;
