import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { List, ListItem } from "@material-tailwind/react";
import React from "react";
import { ProductCategory } from "../../types/redux/product";
import { clx } from "../../util";

type Filter = {
  limit: number;
  page: number;
  featured: boolean;
  name: string;
  colors: string;
  sizes: string;
};

export const CategoryPanel: React.FC<{
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: ProductCategory[];
  setColorsQuery: React.Dispatch<React.SetStateAction<string[]>>;
  setInitialFilterState: React.Dispatch<React.SetStateAction<Filter>>;
  colors: any[];
}> = ({ handleSearch, categories, colors, setColorsQuery, setInitialFilterState }) => {
  console.log(colors);

  const handleColorsQuery = (color: string) => {
    setColorsQuery((prevColors) => {
      if (!prevColors.includes(color)) {
        return [color, ...prevColors];
      }

      return prevColors;
    });

    setInitialFilterState((prevState) => {
      return { ...prevState, colors: [...new Set([...colors.flat()])].join(",") };
    });
  };

  console.log([...new Set([...colors.flat()])].join(","));

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
            <List
              className="p-0 mt-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItem
                className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                All
              </ListItem>
              {categories?.map((c) => (
                <ListItem
                  key={c._id}
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {c.name}
                </ListItem>
              ))}
            </List>
          </div>
          <div className="relative mt-4 pb-5 border-b">
            <h1 className="sm:text-lg lg:text-xl font-bold">Colors</h1>
            <List
              className="p-0 mt-3"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ListItem
                className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                All
              </ListItem>

              <div className="mt-3 flex flex-wrap gap-2">
                {[...new Set([...colors.flat()])]?.map((color: string) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorsQuery(color)}
                    className={clx(
                      "relative flex size-10 cursor-pointer items-center justify-center rounded-full focus:outline-none",
                      // selectedColor === color ? `ring-2 ring-offset-0.5` : "",
                      color === "white" && "ring-black",
                      color === "black" ? "ring-black" : `ring-${color}-500`
                    )}
                    aria-label={color}
                    // aria-pressed={selectedColor === color}
                  >
                    <span
                      aria-hidden="true"
                      className={clx(
                        "size-8 rounded-full border border-black/10",
                        color === "white" || color === "black" ? `bg-${color}` : `bg-${color}-600`
                      )}
                    />
                  </button>
                ))}
              </div>
              {colors?.length !== 0 && (
                <fieldset aria-label="Choose a color" className="mt-3">
                  <legend className="text-base sm:text-lg font-medium text-gray-900 mt-6">
                    Color
                  </legend>
                </fieldset>
              )}
            </List>
          </div>

          <button
            onClick={() => {
              setInitialFilterState({
                limit: 10,
                page: 1,
                featured: false,
                name: "",
                colors: "",
                sizes: "",
              });
            }}
            className="rounded text-center bg-indigo-600 text-white font-medium text-sm w-full px-2 py-2.5 capitalize"
            type="button"
          >
            clear filter
          </button>
        </div>
      </div>

      {/* <Disclosure.Panel className="lg:hidden">
        <div className="fixed left-0 max-w-lg lg:max-w-md right-0 h-[calc(100vh-8.5rem)] top-[8.5rem] flex-col bg-white border z-10">
          <div className="w-full h-full p-4">
            <Disclosure.Button className="lg:hidden absolute right-8 top-4">
              <span className="sr-only">Close side panel</span>
              <XMarkIcon className="h-6" aria-hidden={true} />
            </Disclosure.Button>

            <div className="relative mt-8 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List
                className="p-0 mt-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  All
                </ListItem>
                <ListItem
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Cloth
                </ListItem>
              </List>
            </div>
            <div className="relative mt-4 pb-5 border-b">
              <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
              <List
                className="p-0 mt-3"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <ListItem
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  All
                </ListItem>
                <ListItem
                  className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Cloth
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </Disclosure.Panel> */}
    </>
  );
};
