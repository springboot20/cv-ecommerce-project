import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import React, { Fragment, useCallback, useState } from "react";
import { useCreateAddressMutation } from "../../features/order/address.slice";
import { OrderSummary } from "./OrderSummary";
import { classNames } from "../../helpers";
import { toast } from "react-toastify";
import VerifyPaystackPayment from "./verify/VerifyPayment";
import { InitialValues } from "../../types/formik";
import { ShippingInformation } from "./forms/Address";
import Payment from "./forms/Payment";

const CheckOut: React.FC = () => {
  const [createAddress] = useCreateAddressMutation();
  const [done, setDone] = useState(false);

  const initialValues: InitialValues = {
    email: "",
    country: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
    firstname: "",
    lastname: "",
    address_line_one: "",
    address_line_two: "",
    "card-name": "",
    "card-number": "",
    cvc: "",
    "card-year": "",
    "card-month": "",
  };

  const { handleChange, values, handleBlur, touched, errors, handleSubmit } = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit,
  });

  const handleAddressMutation = useCallback(async (data: InitialValues) => {
    try {
      const response = await createAddress(data).unwrap();

      if (response.statusCode.toString().startsWith("2")) {
        setDone(true);
        toast(response?.message, { type: "success" });
      }
    } catch (error: any) {
      toast(error?.error || error?.data?.message, { type: "error" });
    }
  }, []);

  const formSteps = [
    <ShippingInformation
      errors={errors}
      handleBlur={handleBlur}
      touched={touched}
      handleChange={handleChange}
      values={values}
      key={"shipping-info"}
    />,
    <Payment handleChange={handleChange} values={values} key={"payment"} />,
  ];

  async function onSubmit(values: InitialValues) {
    await handleAddressMutation(values);
  }

  return (
    <Fragment>
      <VerifyPaystackPayment />
      <main className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
          <form id="form" onSubmit={handleSubmit} className="col-span-1 xl:col-span-2">
            <Fragment></Fragment>

            <div className="mt-6 flex items-center justify-between space-x-3">
              {!done && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
          <OrderSummary done={done} />
        </div>
      </main>
    </Fragment>
  );
};

export default CheckOut;
