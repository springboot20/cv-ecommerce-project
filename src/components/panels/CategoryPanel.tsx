import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { List, ListItem } from "@material-tailwind/react";
import React from "react";
import { ProductCategory } from "../../types/redux/product";

export const CategoryPanel: React.FC<{
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: ProductCategory[];
}> = ({ handleSearch, categories }) => {
  return (
    <>
      <div className="fixed hidden lg:block flex-1 max-w-sm min-h-screen top-36 w-full flex-col border-r">
        <div className="w-full h-full p-3.5">
          <Disclosure.Button className="lg:hidden absolute right-8 top-4">
            <span className="sr-only">Close side panel</span>
            <XMarkIcon className="h-6" aria-hidden={true} />
          </Disclosure.Button>

          <div className="relative mt-8">
            <MagnifyingGlassIcon
              className={`eye-icon absolute top-[50%] translate-y-[-50%] left-4 cursor-pointer text-xl text-gray-700`}
            />
            <input
              id="password"
              name="search"
              type="text"
              placeholder="search for product here..."
              autoComplete="password"
              onChange={handleSearch}
              className={`block w-full rounded-md border-0 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-base font-base sm:leading-6 `}
            />
          </div>
          <div className="relative mt-4 pb-5 border-b">
            <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
            <List className="p-0 mt-3">
              <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                All
              </ListItem>
              {categories?.map((c) => (
                <ListItem
                  key={c._id}
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                >
                  {c.name}
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="lg:hidden">
        <div className="fixed left-0 max-w-lg lg:max-w-md right-0 h-[calc(100vh-8.5rem)] top-[8.5rem] flex-col bg-white border z-10">
          <div className="w-full h-full p-4">
            <Disclosure.Button className="lg:hidden absolute right-8 top-4">
              <span className="sr-only">Close side panel</span>
              <XMarkIcon className="h-6" aria-hidden={true} />
            </Disclosure.Button>

            <div className="relative mt-8 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List className="p-0 mt-3">
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  All
                </ListItem>
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  Cloth
                </ListItem>
              </List>
            </div>
            <div className="relative mt-4 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List className="p-0 mt-3">
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  All
                </ListItem>
                <ListItem className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700">
                  Cloth
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </Disclosure.Panel>
    </>
  );
};
