import { UserIcon } from "@heroicons/react/24/outline";
import { useForgotPasswordMutation } from "../../../../features/auth/auth.slice";
import { Button } from "@material-tailwind/react";
import { forgotSchema } from "../../../../schema/Schema";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useForm } from "../../../../hooks/useForm";

export const Details = () => {
  const [forgotPasword, { isLoading }] = useForgotPasswordMutation();
const { handleNextStep } = useForm();
  const { values, handleBlur, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const response = await forgotPasword({ email: values.email }).unwrap();

        const { message, statusCode } = response;

        if (statusCode.toString().startsWith("2")) {
          toast.success(message)       
									setTimeout(() => handleNextStep(), 1500);
          resetForm 
        }

        console.log(values)
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
        <div className=" flex justify-center items-center flex-col">
          <span className="flex items-center justify-center border size-12 rounded-full bg-white">
            <UserIcon className="h-6 text-gray-600" strokeWidth={2} />
          </span>
          <h2 className="mt-2 text-xl text-center font-semibold text-gray-800">Forgot password?</h2>
          <p className="text-center text-[#667085]">
            No worries, we'll send you a reset instructions.
          </p>
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
            disabled={isLoading}
            loading={isLoading}
            className="rounded-3xl w-full flex items-center justify-center uppercase mt-4 bg-light-blue-600 px-3 py-3 text-lg font-medium text-white shadow-sm hover:bg-light-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-blue-600 disabled:opacity-70"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {isLoading ? <span>sending...</span> : <span>Send</span>}
          </Button>
        </form>
      </div>
    </div>
  );
};
