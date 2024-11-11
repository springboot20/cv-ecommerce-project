import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import countries from "../../data/countries";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { clx } from "../../util";
import { useCreateAddressMutation } from "../../features/order/address.slice";
import { toast } from "react-toastify";
import { useCreatePaypalOrderMutation } from "../../features/order/order.slice";

interface InitialValues {
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

const Checkout: React.FC<{
  className?: string;
}> = ({ className = "" }) => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    validationSchema: orderSchema,
    onSubmit: onSubmit,
  });
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const [createAddress] = useCreateAddressMutation();
  const [createPaypalOrder] = useCreatePaypalOrderMutation();

  const [query, setQuery] = useState("");
  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((opt) => opt.name.toLowerCase().includes(query.toLowerCase()));

  const handleCreateOrderAddress = async (data: any) => {
    try {
      const reponse = await createAddress(data).unwrap();

      toast(reponse.message, {
        type: "success",
      });

      return reponse;
    } catch (error: any) {
      toast(error.error, { type: "error" });
      toast(error.data.message, { type: "error" });
    }
  };
  const handleCreatePaypalOrder = async (data: any) => {
    try {
      const reponse = await createPaypalOrder(data).unwrap();

      toast(reponse.message, {
        type: "success",
      });

      return reponse;
    } catch (error: any) {
      toast(error.error, { type: "error" });
      toast(error.data.message, { type: "error" });
    }
  };

  async function onSubmit(values: InitialValues) {
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
    try {
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
      const p_response = await handleCreatePaypalOrder(a_response?.data?.address._id);

      if (
        a_response?.statusCode.toString().startsWith("2") &&
        p_response?.statusCode.toString().startsWith("2")
      ) {
        new Promise((resolve) => setTimeout(() => resolve, 2000));
      }
    } catch (error: any) {}
  }

  const handleSelectChange = (val: Option) => {
    setSelectedCountry(val);

    setFieldValue("country", val.name);
  };
  return (
    <form onSubmit={handleSubmit} className={clx(className)}>
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
        <h1 className="text-xl font-medium capitalize text-gray-600 mb-3">shipping information</h1>

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
            <Combobox
              value={selectedCountry}
              as="div"
              onChange={(val) => handleSelectChange(val!)}
              className={"w-full"}
            >
              <div className="relative">
                <Combobox.Button className="w-full relative">
                  <Combobox.Input
                    aria-label="countries"
                    displayValue={(country: (typeof countries)[0]) => country?.name}
                    onChange={(e) => setQuery(e.target.value)}
                    id="country"
                    className="border p-2 rounded focus:ring-1 outline-none font-satoshi font-normal text-sm !w-full h-11"
                  />
                  <Combobox.Button className="absolute top-1/2 -translate-y-1/2 z-10 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-6 w-6 text-gray-700" aria-hidden={true} />
                  </Combobox.Button>
                </Combobox.Button>

                <Combobox.Options className="border bg-white mt-2 p-2 max-h-60 overflow-y-auto rounded text-base shadow-lg ring-opacity-5 focus:outline-none sm:text-sm">
                  {query !== "" ? (
                    filteredCountries.map((country) => (
                      <Combobox.Option
                        key={country.name}
                        value={country}
                        className="flex items-center space-x-2 py-1.5 px-2 cursor-pointer relative"
                      >
                        <span>{country.name}</span>
                      </Combobox.Option>
                    ))
                  ) : (
                    <div className="relative cursor-default select-none px-4 py-1 text-gray-700 dark:text-white">
                      Nothing found.
                    </div>
                  )}
                </Combobox.Options>
              </div>
            </Combobox>
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
    </form>
  );
};

export default Checkout;
