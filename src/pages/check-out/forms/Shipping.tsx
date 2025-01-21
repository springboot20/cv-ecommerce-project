import { classNames } from "../../../helpers";
import { FormikEvent } from "../../../types/formik";

const Shipping: React.FC<FormikEvent> = ({ values, handleChange, errors, handleBlur, touched }) => {
  return (
    <fieldset className="col-span-full">
      <legend className="text-sm font-normal text-gray-700 sm:text-base">Shipping Method</legend>
      <div className="flex mt-2 flex-col w-full max-w-xl gap-4">
        <label className="flex items-center space-x-2 cursor-pointer w-full">
          <input
            type="radio"
            name="shipping-method"
            value="standard"
            checked={values.shipping_method === "standard"}
            onChange={handleChange}
            onBlur={handleBlur}
            className=""
          />
          <div
            className={classNames(
              "px-4 py-6 border rounded-md w-full",
              values.shipping_method === "standard"
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300",
            )}
          >
            <p className="text-sm font-medium text-gray-700">Standard Shipping</p>
            <p className="text-xs text-gray-500">3-5 business days</p>
          </div>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer w-full">
          <input
            type="radio"
            name="shipping-method"
            value="express"
            checked={values.shipping_method === "express"}
            onChange={handleChange}
            onBlur={handleBlur}
            className=""
          />
          <div
            className={classNames(
              "px-4 py-6 border rounded-md w-full",
              values.shipping_method === "express"
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300",
            )}
          >
            <p className="text-sm font-medium text-gray-700">Express Shipping</p>
            <p className="text-xs text-gray-500">1-2 business days</p>
          </div>
        </label>
      </div>
      {touched!.shipping_method && errors!.shipping_method && (
        <p className="text-red-500 text-sm mt-1">{errors!.shipping_method}</p>
      )}
    </fieldset>
  );
};

export default Shipping;
