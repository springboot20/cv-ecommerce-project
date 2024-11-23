import { Formik, Form, Field, FormikHelpers } from "formik";
import { orderSchema } from "../../schema/Schema";
import countriesData from "../../data/countries";
import React, { useState } from "react";
import {
  useCreateAddressMutation,
  useGetUserAddressQuery,
} from "../../features/order/address.slice";
// import { toast } from "react-toastify";
import {
  useCreatePaypalOrderMutation,
  useVerifyPaypalOrderMutation,
} from "../../features/order/order.slice";
import { OrderSummary } from "../../pages/check-out/OrderSummary";
import { AddressInterface } from "../../types/redux/order";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Loader } from "../Loader";
import { toast } from "react-toastify";

export interface InitialValues {
  email: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  cvc: string;
  firstname: string;
  lastname: string;
  address_line_one: string;
  address_line_two: string;
  "card-name": string;
  "card-number": string;
  "expiring-date": string;
  saveinfo: boolean;
}

type Option = {
  code: string;
  name: string;
};

const Checkout: React.FC = () => {
  const [countries] = useState<Option[]>(countriesData);
  const [{ isPending }] = usePayPalScriptReducer();
  const { data } = useGetUserAddressQuery();
  const [createAddress] = useCreateAddressMutation();
  const [createPaypalOrder] = useCreatePaypalOrderMutation();
  const [verifyPaypalOrder] = useVerifyPaypalOrderMutation();

  const [paymentType, setPaymentType] = useState<string>("credit-card");

  const handlePaymentType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.id);
  };

  const userAddress = data?.data?.address as AddressInterface;

  const initialValues: InitialValues = {
    email: "",
    country: userAddress?.country || "",
    city: userAddress?.city || "",
    state: userAddress?.state || "",
    zipcode: userAddress?.zipcode?.toString() || "", // Ensure zipcode is a string
    phone: userAddress?.phone || "",
    firstname: userAddress?.firstname || "",
    lastname: userAddress?.lastname || "",
    address_line_one: userAddress?.address_line_one || "",
    address_line_two: userAddress?.address_line_two || "",
    cvc: "",
    "card-name": "",
    "card-number": "",
    "expiring-date": "",
    saveinfo: false,
  };

  const createOrder = async () => {
    try {
      const paypalCreateOrderResponse = await createPaypalOrder({ addressId: "" }).unwrap();

      const orderData = paypalCreateOrderResponse.data?.order;

      if (orderData.orderId) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        console.log({ errorDetail, errorMessage });
      }
    } catch (error: any) {
      toast(`Could not initiate PayPal Checkout...${error}`, { type: "error" });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={orderSchema} onSubmit={(_) => {}}>
      {({ setFieldValue }) => {
        return (
          <Form id="form" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
            <div className="col-span-1 xl:col-span-2">
              <fieldset className="pb-8 border-b">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">
                    contact information
                  </h1>
                  <div className="space-x-3">
                    <label
                      htmlFor="saveinfo"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      save info
                    </label>
                    <input
                      type="checkbox"
                      name="saveinfo"
                      className="relative w-12 h-6 rounded-2xl bg-gray-100 !appearance-none border shadow before:absolute before:h-6 before:w-6 before:content-[''] before:rounded-full before:border before:scale-75 before:top-1/2 before:-translate-y-1/2 checked:before:-translate-x-[calc(100%-3rem)] before:bg-white checked:!bg-none pointer-events-auto"
                      onChange={(e) => {
                        setFieldValue("saveinfo", e.target.checked);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="contact address"
                    className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                  />
                </div>
              </fieldset>

              <div className="pt-5">
                <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">
                  shipping information
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="firstname"
                      className="text-sm font-normal text-gray-700 sm:text-base"
                    >
                      First name
                    </label>
                    <Field
                      type="text"
                      name="firstname"
                      placeholder="first name"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="lastname"
                      className="text-sm font-normal text-gray-700 sm:text-base"
                    >
                      Last name
                    </label>
                    <Field
                      type="text"
                      name="lastname"
                      placeholder="last name"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full">
                    <label
                      htmlFor="address_line_one"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      address
                    </label>
                    <Field
                      type="text"
                      name="address_line_one"
                      placeholder="address"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full">
                    <label
                      htmlFor="address_line_two"
                      className="text-sm font-normal text-gray-700 sm:text-base"
                    >
                      Apartment, suite, etc.
                    </label>
                    <Field
                      type="text"
                      name="address_line_two"
                      placeholder="apartment, suite, etc"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="city"
                      className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                    >
                      city
                    </label>
                    <Field
                      type="text"
                      name="city"
                      placeholder="city"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="country"
                      className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                    >
                      country
                    </label>
                    <Field
                      as="select"
                      name="country"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    >
                      <option>select your country</option>

                      {React.Children.toArray(
                        countries.map((country) => {
                          return <option value={country.name}>{country.name}</option>;
                        }),
                      )}
                    </Field>
                  </fieldset>

                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="state"
                      className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                    >
                      state / province
                    </label>
                    <Field
                      type="text"
                      name="state"
                      placeholder="state"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full sm:col-span-1">
                    <label
                      htmlFor="zipcode"
                      className="text-sm font-normal text-gray-700 sm:text-base"
                    >
                      Postal code
                    </label>
                    <Field
                      name="zipcode"
                      type="number"
                      placeholder="12345"
                      className="block w-full appearance-none leading-normal rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>

                  <fieldset className="col-span-full">
                    <label
                      htmlFor="phone"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      phone
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="phone"
                      className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">
                  delivery method
                </h1>
              </div>
              <div className="pt-5">
                <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">payment</h1>
                <div className="flex items-center space-x-10">
                  <fieldset className="space-x-3">
                    <input
                      type="radio"
                      name="payment-type"
                      onChange={handlePaymentType}
                      checked={paymentType === "credit-card"}
                      id="credit-card"
                    />
                    <label
                      htmlFor="credit-card"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      credit card
                    </label>
                  </fieldset>

                  <fieldset className="space-x-3">
                    <input
                      type="radio"
                      name="payment-type"
                      onChange={handlePaymentType}
                      checked={paymentType === "paypal"}
                      id="paypal"
                    />
                    <label
                      htmlFor="paypal"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      paypal
                    </label>
                  </fieldset>

                  <fieldset className="space-x-3">
                    <input
                      type="radio"
                      name="payment-type"
                      onChange={handlePaymentType}
                      checked={paymentType === "e-transfer"}
                      id="e-transfer"
                    />
                    <label
                      htmlFor="e-transfer"
                      className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                    >
                      e-transfer
                    </label>
                  </fieldset>
                </div>

                {paymentType === "credit-card" ? (
                  <CardForm />
                ) : paymentType === "paypal" ? (
                  <>
                    {isPending ? (
                      <Loader />
                    ) : (
                      <PayPalButtons
                        style={{
                          shape: "rect",
                          layout: "vertical",
                          color: "gold",
                          label: "paypal",
                        }}
                        createOrder={createOrder}
                        onApprove={async (data, actions) => {
                          try {
                            const orderData = await verifyPaypalOrder(data.orderID).unwrap();

                            // Three cases to handle:
                            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                            //   (2) Other non-recoverable errors -> Show a failure message
                            //   (3) Successful transaction -> Show confirmation or thank you message

                            const errorDetail = orderData?.data?.orderBody?.details?.[0];

                            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                              return actions.restart();
                            } else if (errorDetail) {
                              // (2) Other non-recoverable errors -> Show a failure message
                              throw new Error(
                                `${errorDetail.description} (${orderData?.data?.orderBody?.debug_id})`,
                              );
                            } else {
                              // (3) Successful transaction -> Show confirmation or thank you message
                              // Or go to another URL:  actions.redirect('thank_you.html');
                              const transaction =
                                orderData?.data?.orderBody?.purchase_units[0].payments.captures[0];

                              console.log(transaction);
                            }
                          } catch (error: any) {
                            console.log(error);
                          }
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div />
                )}
              </div>
            </div>
            <OrderSummary />
          </Form>
        );
      }}
    </Formik>
  );
};

export default Checkout;

const CardForm = () => {
  return (
    <>
      <fieldset className="mt-4">
        <label
          htmlFor="card-number"
          className="text-sm font-normal text-gray-700 sm:text-base capitalize"
        >
          card number
        </label>
        <Field
          name="card-number"
          className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
        />
      </fieldset>

      <fieldset className="mt-4">
        <label
          htmlFor="card-name"
          className="text-sm font-normal text-gray-700 sm:text-base capitalize"
        >
          card name
        </label>
        <Field
          name="card-name"
          className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
        />
      </fieldset>

      <div className="flex items-center gap-3 mt-4">
        <fieldset className="flex-1">
          <label
            htmlFor="expiring-date"
            className="text-sm font-normal text-gray-700 sm:text-base capitalize"
          >
            expiring-date
          </label>
          <Field
            name="expiring-date"
            className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="cvc"
            className="text-sm font-normal text-gray-700 sm:text-base capitalize"
          >
            CVC
          </label>
          <Field
            name="cvc"
            className="block rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
          />
        </fieldset>
      </div>
    </>
  );
};
