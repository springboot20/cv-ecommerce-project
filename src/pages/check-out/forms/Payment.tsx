import { Tab } from "@headlessui/react";
import React from "react";
import { clx, formatCardExpiry, formatCardNumber } from "../../../util";
import { FormikEvent } from "../../../types/formik";
import { classNames } from "../../../helpers";
import PayButton from "../../../components/buttons/PayStackButton";

const Payment: React.FC<FormikEvent & { done: boolean }> = ({
  values,
  setFieldValue,
  handleChange,
  done,
}) => {
  return (
    <>
      <Tab.Group>
        <Tab.List className="border w-full flex items-center">
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={clx(
                  selected && "text-gray-800 bg-[#EBEBEB]",
                  "focus:outline-none text-lg font-satoshi font-normal p-3 w-full"
                )}
              >
                credit card
              </button>
            )}
          </Tab>

          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={clx(
                  selected && "text-gray-800 bg-[#EBEBEB]",
                  "focus:outline-none text-lg font-satoshi font-normal p-3 border-r w-full"
                )}
              >
                paypal
              </button>
            )}
          </Tab>

          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={clx(
                  selected && "text-gray-800 bg-[#EBEBEB]",
                  "focus:outline-none text-lg font-satoshi font-normal p-3 w-full"
                )}
              >
                paystack
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-4">
          <Tab.Panel as="div" className="p-3">
            <h3 className="capitalize font-medium text-gray-700">payment details</h3>
            <div className="mt-3">
              <fieldset className="col-span-full sm:col-span-1">
                <label
                  htmlFor="card_name"
                  className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                >
                  card name
                </label>
                <input
                  type="text"
                  name="card_name"
                  id="card_name"
                  value={values.card_name}
                  onChange={handleChange}
                  placeholder="card holder name"
                  className={classNames(
                    "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400"
                  )}
                />
              </fieldset>

              <fieldset className="col-span-full sm:col-span-1 mt-4">
                <label
                  htmlFor="card_number"
                  className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                >
                  card number
                </label>
                <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  value={values.card_number}
                  onChange={(event) => {
                    if (setFieldValue)
                      setFieldValue("card_number", formatCardNumber(event.target.value));
                  }}
                  placeholder="card number"
                  className={classNames(
                    "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400"
                  )}
                />
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <fieldset className="col-span-full md:col-span-1">
                  <label
                    htmlFor="card_expiry"
                    className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                  >
                    Card Expiry
                  </label>
                  <input
                    type="text"
                    name="card_expiry"
                    id="card_expiry"
                    value={values.card_expiry}
                    onChange={(event) => {
                      if (setFieldValue) {
                        setFieldValue("card_expiry", formatCardExpiry(event?.target.value));
                      }
                    }}
                    placeholder="MM/YY"
                    className={classNames(
                      "block w-full rounded border-0 px-3 py-3.5 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400"
                    )}
                  />
                </fieldset>

                <fieldset className="col-span-full md:col-span-1">
                  <label
                    htmlFor="cvc"
                    className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    name="cvc"
                    id="cvc"
                    value={values["cvc"]}
                    onChange={handleChange}
                    placeholder="CVC"
                    maxLength={3}
                    className={classNames(
                      "block w-full rounded border-0 px-3 py-3.5 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400"
                    )}
                  />
                </fieldset>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel></Tab.Panel>
          <Tab.Panel className="xl:max-w-md mx-auto">{done && <PayButton />}</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Payment;
