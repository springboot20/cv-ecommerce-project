import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import countriesData from "../../data/countries";
import React, { useEffect, useState } from "react";
import {
  useCreateAddressMutation,
  useGetUserAddressQuery,
} from "../../features/order/address.slice";
import { toast } from "react-toastify";
import { useCreatePaypalOrderMutation } from "../../features/order/order.slice";
import { OrderSummary } from "../../pages/check-out/OrderSummary";
import { AddressInterface } from "../../types/redux/order";

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
  "expiring-date": Date;
  saveinfo: boolean;
}

type Option = {
  code: string;
  name: string;
};

const initialValues: InitialValues = {
  email: "",
  country: "",
  city: "",
  state: "",
  zipcode: "",
  phone: "",
  cvc: "",
  firstname: "",
  lastname: "",
  address_line_one: "",
  address_line_two: "",
  "card-name": "",
  "card-number": "",
  "expiring-date": new Date(),
  saveinfo: false,
};

const Checkout: React.FC = () => {
  const { values, handleChange, setValues } = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit: (_) => {},
  });
  const [countries, setCountries] = useState<Option[]>(countriesData);
  const { data, isSuccess } = useGetUserAddressQuery();
  const [createAddress] = useCreateAddressMutation();
  const [createPaypalOrder] = useCreatePaypalOrderMutation();

  const userAddress = data?.data?.address as AddressInterface;

  const handleCreateOrderAddress = async (data: any) => {
    try {
      const reponse = await createAddress(data).unwrap();

      toast(reponse?.message, {
        type: "success",
      });

      return reponse;
    } catch (error: any) {
      toast(error.error, { type: "error" });
      toast(error.data?.message, { type: "error" });
    }
  };

  const handleCreatePaypalOrder = async (data: any) => {
    try {
      const reponse = await createPaypalOrder(data).unwrap();

      toast(reponse?.message, {
        type: "success",
      });

      return reponse;
    } catch (error: any) {
      toast(error.error || error.data?.message, { type: "error" });
    }
  };

  async function handleSubmit() {
    const {
      city,
      country,
      address_line_one,
      address_line_two,
      zipcode,
      state,
      phone,
      firstname,
      lastname,
    } = values;

    const a_response = await handleCreateOrderAddress({
      city,
      country,
      address_line_one,
      address_line_two,
      zipcode,
      state,
      phone,
      firstname,
      lastname,
    });
    const p_response = await handleCreatePaypalOrder({ addressId: a_response?.data?.address._id });

    if (
      a_response?.statusCode.toString().startsWith("2") &&
      p_response?.statusCode.toString().startsWith("2")
    ) {
      new Promise((resolve) => setTimeout(() => resolve, 2000));
    }
  }

  useEffect(() => {
    if (isSuccess && userAddress) {
      setValues({
        ...initialValues,
        ...userAddress,
        country: userAddress?.country,
      });

      const selectedCountry = countries.find((country) => country.name === userAddress?.country)!;
      setCountries(selectedCountry ? [selectedCountry] : countries);
    }
  }, []);

  return (
    <form name="form" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8">
      <div className="col-span-1 xl:col-span-2">
        <fieldset className="pb-8 border-b">
          <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">contact information</h1>

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
              value={values.email}
              onChange={handleChange}
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
              <label htmlFor="firstname" className="text-sm font-normal text-gray-700 sm:text-base">
                First name
              </label>
              <input
                type="text"
                id="firstname"
                value={values.firstname}
                onChange={handleChange}
                placeholder="first name"
                className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
              />
            </fieldset>

            <fieldset className="col-span-full sm:col-span-1">
              <label htmlFor="lastname" className="text-sm font-normal text-gray-700 sm:text-base">
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="last name"
                value={values.lastname}
                onChange={handleChange}
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
              <input
                type="text"
                id="address_line_one"
                placeholder="address"
                value={values.address_line_one}
                onChange={handleChange}
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
              <input
                type="text"
                placeholder="apartment, suite, etc"
                id="address_line_two"
                value={values.address_line_two}
                onChange={handleChange}
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
              <input
                type="text"
                onChange={handleChange}
                value={values.city}
                placeholder="city"
                id="city"
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
              <select name="country" id="country" value={values.country} onChange={handleChange}>
                <option>select your country</option>

                {React.Children.toArray(
                  countries.map((country) => {
                    return <option value={country.name}>{country.name}</option>;
                  }),
                )}
              </select>
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
                id="state"
                placeholder="state"
                value={values.state}
                onChange={handleChange}
                className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
              />
            </fieldset>

            <fieldset className="col-span-full sm:col-span-1">
              <label htmlFor="zipcode" className="text-sm font-normal text-gray-700 sm:text-base">
                Postal code
              </label>
              <input
                id="zipcode"
                type="number"
                placeholder="12345"
                value={values.zipcode}
                onChange={handleChange}
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
              <input
                type="tel"
                id="phone"
                placeholder="phone"
                value={values.phone}
                onChange={handleChange}
                className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
              />
            </fieldset>
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">delivery method</h1>
        </div>
      </div>
      <OrderSummary handleSubmit={handleSubmit} />
    </form>
  );
};

export default Checkout;
