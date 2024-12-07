import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import React, { Fragment, useCallback, useState } from "react";
import { useCreateAddressMutation } from "../../features/order/address.slice";
import { OrderSummary } from "./OrderSummary";
import { toast } from "react-toastify";
import VerifyPaystackPayment from "./verify/VerifyPayment";
import { InitialValues } from "../../types/formik";
import { ShippingInformation } from "./forms/Address";
import Payment from "./forms/Payment";
import { motion } from "framer-motion";
import Shipping from "./forms/Shipping";

const CheckOut: React.FC = () => {
  const [createAddress] = useCreateAddressMutation();
  const [done, setDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

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
    "shipping-method": "",
  };

  const { handleChange, values, handleBlur, touched, errors, handleSubmit, validateForm } =
    useFormik({
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
    <Shipping
      key="shipping"
      values={values}
      handleChange={handleChange}
      errors={errors}
      handleBlur={handleBlur}
      touched={touched}
    />,
    <Payment handleChange={handleChange} values={values} key={"payment"} done={done} />,
  ];

  async function onSubmit(values: InitialValues) {
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1) {
      await handleAddressMutation(values);
      setCurrentStep(currentStep + 1);
    } else {
      // Handle payment submission here console.log("Payment submitted", values);
    }
  }

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  const handleNextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      setCurrentStep(currentStep + 1);
    } else {
      toast("input fields cannot be empty.", { type: "error" });
    }
  };

  const buttonText = currentStep === 0 ? "Continue to Shipping" : "Continue to Payment";
  const buttonType = currentStep === 1 ? "submit" : "button";

  return (
    <Fragment>
      <VerifyPaystackPayment />
      <main className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
          <form id="form" onSubmit={handleSubmit} className="col-span-1 xl:col-span-2">
            <StepIndicator currentStep={currentStep} />
            <div className="">
              <motion.div>
                <motion.div
                  key={currentStep}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  {formSteps[currentStep]}
                </motion.div>
              </motion.div>

              <div className="mt-6 flex items-center justify-between space-x-3">
                {!done && currentStep < formSteps.length - 1 && (
                  <button
                    type={buttonType}
                    onClick={buttonType === "button" ? handleNextStep : undefined}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          </form>
          <OrderSummary />
        </div>
      </main>
    </Fragment>
  );
};

export default CheckOut;

const steps = ["Address", "Shipping", "Payment"];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step, index) => (
        <div key={index} className="flex-1">
          <motion.div
            className={`text-center ${index <= currentStep ? "text-blue-600" : "text-gray-400"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {step}
          </motion.div>
        </div>
      ))}
    </div>
  );
};
