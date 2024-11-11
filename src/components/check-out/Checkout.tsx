import { useFormik } from "formik";
import { orderSchema } from "../../schema/Schema";
// import { Button } from "@material-tailwind/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import countries from "../../data/countries";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { clx } from "../../util";

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
  "address-line-one": string;
  "address-line-two": string;
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
  "address-line-one": "",
  "address-line-two": "",
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

  const [query, setQuery] = useState("");
  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((opt) => opt.name.toLowerCase().includes(query.toLowerCase()));

  async function onSubmit() {
    if (values) {
      const btn = document.querySelector("button") as HTMLButtonElement;
      btn.innerHTML = "checking out....";
      btn.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
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
              onChange={handleChange}
              className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
            />
          </fieldset>

          <fieldset className="col-span-full">
            <label
              htmlFor="address-line-one"
              className="capitalize text-sm font-normal text-gray-700 sm:text-base"
            >
              address
            </label>
            <input
              type="text"
              id="address-line-one"
              placeholder="address"
              onChange={handleChange}
              className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
            />
          </fieldset>

          <fieldset className="col-span-full">
            <label
              htmlFor="address-line-two"
              className="text-sm font-normal text-gray-700 sm:text-base"
            >
              Apartment, suite, etc.
            </label>
            <input
              type="text"
              placeholder="apartment, suite, etc"
              id="address-line-two"
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
              onChange={handleChange}
              placeholder="state"
              id="state"
              className="block w-full rounded border-0 p-3 text-gray-700 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm outline-none"
            />
          </fieldset>

          <fieldset className="col-span-full sm:col-span-1">
            <label htmlFor="zipcode" className="text-sm font-normal text-gray-700 sm:text-base">
              Postal code
            </label>
            <input
              type="number"
              placeholder="12345"
              onChange={handleChange}
              id="zipcode"
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
