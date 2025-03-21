import { Tab } from "@headlessui/react";
import React from "react";
import { clx } from "../../../util";
import { FormikEvent } from "../../../types/formik";
import { classNames } from "../../../helpers";
import PayButton from "../../../components/buttons/PayStackButton";

const Payment: React.FC<FormikEvent & { done: boolean }> = ({ values, handleChange, done }) => {
  return (
    <>
      <Tab.Group>
        <Tab.List className="border max-w-md flex items-center">
          <Tab as={React.Fragment}>
            {({ selected }) => (
              <button
                className={clx(
                  selected && "text-gray-800 bg-[#EBEBEB]",
                  "focus:outline-none text-lg font-satoshi font-normal p-3 w-full",
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
                  "focus:outline-none text-lg font-satoshi font-normal p-3 border-r w-full",
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
                  "focus:outline-none text-lg font-satoshi font-normal p-3 w-full",
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
                  htmlFor="card-name"
                  className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                >
                  card name
                </label>
                <input
                  type="text"
                  name="card-name"
                  id="card-name"
                  value={values["card-name"]}
                  onChange={handleChange}
                  placeholder="card holder name"
                  className={classNames(
                    "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400",
                  )}
                />
              </fieldset>

              <fieldset className="col-span-full sm:col-span-1 mt-4">
                <label
                  htmlFor="card-number"
                  className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                >
                  card number
                </label>
                <input
                  type="text"
                  name="card-number"
                  id="card-number"
                  value={values["card-number"]}
                  onChange={handleChange}
                  placeholder="card number"
                  className={classNames(
                    "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400",
                  )}
                />
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <fieldset className="col-span-full md:col-span-1">
                  <label
                    htmlFor="card-month"
                    className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                  >
                    Card Month
                  </label>
                  <input
                    type="text"
                    name="card-month"
                    id="card-month"
                    value={values["card-month"]}
                    onChange={handleChange}
                    placeholder="MM"
                    className={classNames(
                      "block w-full rounded border-0 px-3 py-3.5 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400",
                    )}
                  />
                </fieldset>

                <fieldset className="col-span-full md:col-span-1">
                  <label
                    htmlFor="card-year"
                    className="text-sm font-normal text-gray-700 sm:text-base sr-only"
                  >
                    Card Year
                  </label>
                  <input
                    type="text"
                    name="card-year"
                    id="card-year"
                    value={values["card-year"]}
                    onChange={handleChange}
                    placeholder="YYYY"
                    className={classNames(
                      "block w-full rounded border-0 px-3 py-3.5 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400",
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
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none disabled:bg-transparent disabled:text-gray-400",
                    )}
                  />
                </fieldset>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel></Tab.Panel>
          <Tab.Panel>
            {done && (
              <div className="px-5 py-4">
                <PayButton />
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Payment;
