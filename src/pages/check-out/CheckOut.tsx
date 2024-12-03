import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import countriesData from "../../data/countries";
import React, { Fragment, useEffect, useState } from "react";
import { useCreateAddressMutation } from "../../features/order/address.slice";
import { OrderSummary } from "./OrderSummary";
import { AddressInterface } from "../../types/redux/order";
import { classNames } from "../../helpers";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/redux/redux.hooks";
import { saveUserAddressInfo } from "../../features/order/address.reducer";
import { LocalStorage } from "../../util";

export interface InitialValues {
  email: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  firstname: string;
  lastname: string;
  address_line_one: string;
  address_line_two: string;
  saveinfo: boolean;
}

type Option = {
  code: string;
  name: string;
};

const CheckOut: React.FC = () => {
  const [createAddress] = useCreateAddressMutation();
  const [countries] = useState<Option[]>(countriesData);
  const [done, setDone] = useState(false);
  const dispatch = useAppDispatch();

  const savedInfo = LocalStorage.get("saveInfo") as boolean;
  const savedAddressInfo = LocalStorage.get("user-address") as AddressInterface;

  const [addressId, setAddressId] = useState<string>(savedAddressInfo._id);

  const initialValues: InitialValues = {
    email: "",
    country: savedAddressInfo?.country || "",
    city: savedAddressInfo?.city || "",
    state: savedAddressInfo?.state || "",
    zipcode: savedAddressInfo?.zipcode?.toString() || "", // Ensure zipcode is a string
    phone: savedAddressInfo?.phone || "",
    firstname: savedAddressInfo?.firstname || "",
    lastname: savedAddressInfo?.lastname || "",
    address_line_one: savedAddressInfo?.address_line_one || "",
    address_line_two: savedAddressInfo?.address_line_two || "",
    saveinfo: savedInfo ?? false,
  };

  async function onSubmit(values: InitialValues) {
    setDone(true);
    const {
      country,
      city,
      state,
      zipcode,
      phone,
      firstname,
      lastname,
      address_line_one,
      address_line_two,
    } = values;

    try {
      const address = await createAddress({
        country,
        city,
        state,
        zipcode,
        phone,
        firstname,
        lastname,
        address_line_one,
        address_line_two,
      }).unwrap();

      if (address.statusCode.toString().startsWith("2")) {
        setAddressId(address.data.address?._id);
        dispatch(
          saveUserAddressInfo({
            saveInfo: values.saveinfo,
          }),
        );
        toast(address?.message, { type: "success" });
      }
    } catch (error: any) {
      setDone(false);
      toast(error?.error, { type: "error" });
    }
  }

  const { handleChange, values, handleBlur, touched, errors, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: orderSchema,
      onSubmit,
    });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <main className="mx-auto max-w-7xl px-2 md:px-4 xl:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
        <form id="form" onSubmit={handleSubmit} className="col-span-1 xl:col-span-2">
          <Fragment>
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
                    id="saveinfo"
                    checked={values.saveinfo}
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
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="contact address"
                  className={classNames(
                    "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                    errors.email && touched.email ? "ring-red-600 ring-[0.15rem]" : "",
                  )}
                />
                {errors.email && touched.email && (
                  <small className="text-base text-red-600">{errors.email}</small>
                )}
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
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={values.firstname}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="first name"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.firstname && touched.firstname ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.firstname && touched.firstname && (
                    <small className="text-base text-red-600">{errors.firstname}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full sm:col-span-1">
                  <label
                    htmlFor="lastname"
                    className="text-sm font-normal text-gray-700 sm:text-base"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    placeholder="last name"
                    onBlur={handleBlur}
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.lastname && touched.lastname ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.lastname && touched.lastname && (
                    <small className="text-base text-red-600">{errors.lastname}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full">
                  <label
                    htmlFor="address_line_one"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    address
                  </label>
                  <input
                    type="text"
                    name="address_line_one"
                    id="address_line_one"
                    value={values.address_line_one}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="address"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.address_line_one && touched.address_line_one
                        ? "ring-red-600 ring-[0.15rem]"
                        : "",
                    )}
                  />
                  {errors.address_line_one && touched.address_line_one && (
                    <small className="text-base text-red-600">{errors.address_line_one}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full">
                  <label
                    htmlFor="address_line_two"
                    className="text-sm font-normal text-gray-700 sm:text-base"
                  >
                    Apartment, suite, etc.
                  </label>
                  <input
                    type="text"
                    name="address_line_two"
                    id="address_line_two"
                    value={values.address_line_two}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="apartment, suite, etc"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.address_line_two && touched.address_line_two
                        ? "ring-red-600 ring-[0.15rem]"
                        : "",
                    )}
                  />
                  {errors.address_line_two && touched.address_line_two && (
                    <small className="text-base text-red-600">{errors.address_line_two}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full sm:col-span-1">
                  <label
                    htmlFor="city"
                    className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                  >
                    city
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="city"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.city && touched.city ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.city && touched.city && (
                    <small className="text-base text-red-600">{errors.city}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full sm:col-span-1">
                  <label
                    htmlFor="country"
                    className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                  >
                    country
                  </label>
                  <select
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.country && touched.country ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  >
                    <option>select your country</option>

                    {React.Children.toArray(
                      countries.map((country) => {
                        return <option value={country.name}>{country.name}</option>;
                      }),
                    )}
                  </select>
                  {errors.country && touched.country && (
                    <small className="text-base text-red-600">{errors.country}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full sm:col-span-1">
                  <label
                    htmlFor="state"
                    className="text-sm capitalize font-normal text-gray-700 sm:text-base"
                  >
                    state / province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="state"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.state && touched.state ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.state && touched.state && (
                    <small className="text-base text-red-600">{errors.state}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full sm:col-span-1">
                  <label
                    htmlFor="zipcode"
                    className="text-sm font-normal text-gray-700 sm:text-base"
                  >
                    Postal code
                  </label>
                  <input
                    name="zipcode"
                    id="zipcode"
                    type="number"
                    value={values.zipcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="12345"
                    className={classNames(
                      "block w-full appearance-none leading-normal rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.zipcode && touched.zipcode ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.zipcode && touched.zipcode && (
                    <small className="text-base text-red-600">{errors.zipcode}</small>
                  )}
                </fieldset>

                <fieldset className="col-span-full">
                  <label
                    htmlFor="phone"
                    className="capitalize text-sm font-normal text-gray-700 sm:text-base"
                  >
                    phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="phone"
                    className={classNames(
                      "block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none",
                      errors.phone && touched.phone ? "ring-red-600 ring-[0.15rem]" : "",
                    )}
                  />
                  {errors.phone && touched.phone && (
                    <small className="text-base text-red-600">{errors.phone}</small>
                  )}
                </fieldset>
              </div>
            </div>
          </Fragment>
          <div className="my-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={done}
              className={classNames(
                "text-base font-normal text-white py-2.5 px-4 rounded-md bg-gray-800 hover:bg-gray-600 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600",
              )}
            >
              save and continue
            </button>
          </div>
        </form>
        <OrderSummary done={done} addressId={addressId}/>
      </div>
    </main>
  );
};

export default CheckOut;
