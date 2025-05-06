import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useCreateAddressMutation } from "../../features/order/address.slice";
import { OrderSummary } from "./OrderSummary";
import { toast } from "react-toastify";
import { InitialValues } from "../../types/formik";
import { ShippingInformation } from "./forms/Address";
import Payment from "./forms/Payment";
import { motion } from "framer-motion";
import Shipping from "./forms/Shipping";
import { useNavigate, useLocation } from "react-router";

const CheckOut: React.FC = () => {
  const [createAddress] = useCreateAddressMutation();
  const [done, setDone] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Parse the URL parameters to get initial step and tab
  const getInitialStepFromUrl = (): number => {
    const urlParams = new URLSearchParams(location.search);
    const stepParam = urlParams.get("step");
    // Convert to number, validate between 1-3, default to 1 if invalid
    const step = parseInt(stepParam || "1", 10);
    return isNaN(step) || step < 1 || step > 3 ? 0 : step - 1; // Convert to 0-based index
  };

  const getInitialTabFromUrl = (): string => {
    const urlParams = new URLSearchParams(location.search);
    const tabParam = urlParams.get("tab");
    // Validate tab value, default to "address" if invalid
    return ["address", "shipping", "payment"].includes(tabParam || "") ? tabParam! : "address";
  };

  // Initialize state from URL parameters
  const [currentStep, setCurrentStep] = useState(getInitialStepFromUrl() || 0);
  const [tabView, setTabView] = useState(getInitialTabFromUrl() || "address");

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
    card_name: "",
    card_number: "",
    cvc: "",
    card_expiry: "",
    shipping_method: "",
  };

  const {
    handleChange,
    values,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    validateForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit,
  });

  const handleAddressMutation = useCallback(
    async (data: InitialValues) => {
      const response = await createAddress(data).unwrap();

      if (response.statusCode.toString().startsWith("2")) {
        setDone(true);
      } else {
        setDone(false);
      }
    },
    [createAddress]
  );

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
    <Payment
      handleChange={handleChange}
      setFieldValue={setFieldValue}
      values={values}
      key={"payment"}
      done={done}
    />,
  ];

  async function onSubmit(values: InitialValues) {
    if (currentStep === 0) {
      setCurrentStep(1);
      setTabView("shipping");
    } else if (currentStep === 1) {
      await handleAddressMutation(values);
      setCurrentStep(2);
      setTabView("payment");
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
    if (Object.keys(errors)?.length === 0) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Update tab view based on next step
      if (nextStep === 1) {
        setTabView("shipping");
      } else if (nextStep === 2) {
        setTabView("payment");
      }
    } else {
      toast("input fields cannot be empty.", { type: "error" });
    }
  };

  const buttonText = currentStep === 0 ? "Continue to Shipping" : "Continue to Payment";
  const buttonType = currentStep === 1 ? "submit" : "button";

  // Update URL when step or tabView changes - with extra safety checks
  useEffect(() => {
    // Ensure currentStep is a valid number
    if (typeof currentStep !== "number" || isNaN(currentStep)) {
      // Reset to a valid state if somehow we got into an invalid state
      setCurrentStep(0);
      setTabView("address");
      return;
    }

    // Convert from 0-based index to 1-based for URL (with safety check)
    const stepForUrl = Math.min(Math.max(1, currentStep + 1), 3);

    // Safe navigation with valid parameters
    navigate(`/check-out?step=${stepForUrl}&tab=${tabView}`, { replace: true });
  }, [currentStep, tabView, navigate]);

  return (
    <Fragment>
      <main className="mx-auto max-w-5xl px-2 md:px-4 xl:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
          <form id="form" onSubmit={handleSubmit} className="col-span-1 xl:col-span-2">
            <StepIndicator currentStep={currentStep} />
            <div className="w-full">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {formSteps[currentStep]}
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

const steps = ["address", "shipping", "payment"];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center relative mb-1">
        {/* Line indicators between steps */}
        <div className="absolute h-0.5 bg-gray-300 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0" />

        {/* Completed line indicators */}
        <div
          className="absolute h-0.5 bg-blue-600 left-0 top-1/2 transform -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: currentStep === 0 ? "0%" : currentStep === 1 ? "50%" : "100%",
          }}
        />

        {/* Step circles */}
        {steps.map((_, index) => (
          <div key={index} className="z-10">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-white border-2 border-gray-300 text-gray-400"
              } transition-all duration-300`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Step labels */}
      <div className="flex justify-between items-center mt-2">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <motion.div
              className={`text-center text-sm font-medium ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};
