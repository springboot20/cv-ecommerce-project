import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { List, ListItem } from "@material-tailwind/react";
import React from "react";
import { ProductCategory } from "../../types/redux/product";
import { clx } from "../../util";
import { useState } from "react";
import { Disclosure } from "@headlessui/react";

type Filter = {
  limit: number;
  page: number;
  featured: boolean;
  name: string;
  colors: string;
  sizes: string;
};

type Size = {
  name: string;
  inStock: boolean;
};

export const CategoryPanel: React.FC<{
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: ProductCategory[];
  categoryQuery: string;
  searchQuery: string;
  setPriceRange: React.Dispatch<
    React.SetStateAction<{
      min: number;
      max: number;
    }>
  >;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setColorsQuery: React.Dispatch<React.SetStateAction<string[]>>;
  setCategoryQuery: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSizesQuery: React.Dispatch<React.SetStateAction<string[]>>;
  setInitialFilterState: React.Dispatch<React.SetStateAction<Filter>>;
  colors: any[];
  sizes: any[];
  priceRange: {
    min: number;
    max: number;
  };
}> = ({
  handleSearch,
  setPage,
  categories,
  colors,
  sizes,
  setSizesQuery,
  setPriceRange,
  // setSortBy,
  setColorsQuery,
  searchQuery,
  setCategoryQuery,
  setInitialFilterState,
  categoryQuery,
  priceRange,
}) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const uniqueColors = [...new Set(colors?.flat())].filter(Boolean);
  const uniqueSizes = [...new Set(sizes?.flat()?.map((size: Size) => size.name))].filter(Boolean);

  const handleColorsQuery = (color: string) => {
    // Toggle color selection
    setSelectedColors((prevSelected) => {
      const newSelected = prevSelected.includes(color)
        ? prevSelected.filter((c) => c !== color)
        : [...prevSelected, color];

      // Update the colors query array in parent component
      setColorsQuery(newSelected);

      // Update the filter state with comma-separated color string
      setInitialFilterState((prevState) => ({
        ...prevState,
        colors: newSelected.join(","),
      }));

      return newSelected;
    });

    setPage(1);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    setPage(1); // Reset to first page
  };

  // const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSortBy(e.target.value);
  // };
  

  const handleSizesQuery = (size: string) => {
    // Toggle size selection
    setSelectedSizes((prevSelected) => {
      const newSelected = prevSelected.includes(size)
        ? prevSelected.filter((_size) => _size !== size)
        : [...prevSelected, size];

      // Update the sizes query array in parent component
      setSizesQuery(newSelected);

      // Update the filter state with comma-separated size string
      setInitialFilterState((prevState) => ({
        ...prevState,
        sizes: newSelected.join(","),
      }));

      return newSelected;
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    const newCategory = categoryQuery === categoryId ? "" : categoryId;
    setCategoryQuery(newCategory);

    // Update filter state with selected category
    setInitialFilterState((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setColorsQuery([]);
    setSizesQuery([]);
    setCategoryQuery("");
    setPriceRange({ min: 0, max: 1000 });
    // setSortBy("featured");
    setPage(1);
    setInitialFilterState({
      limit: 10,
      page: 1,
      featured: false,
      name: "",
      colors: "",
      sizes: "",
    });
  };

  // Shared filter panel content that will be used for both desktop and mobile
  const FilterPanelContent = ({ isMobile = false }) => (
    <>
      {isMobile && (
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="eye-icon absolute top-[50%] translate-y-[-50%] left-4 cursor-pointer text-xl text-gray-700" />
          <input
            name="search"
            type="text"
            placeholder="search for product here..."
            onChange={handleSearch}
            value={searchQuery}
            className="block w-full rounded-md border-0 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-base font-base sm:leading-6"
          />
        </div>
      )}

      <div className="relative pb-5 border-b mt-3">
        <h1 className="sm:text-lg lg:text-xl font-bold">Category</h1>
        <List
          className="p-0 mt-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <ListItem
            className="group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700"
            onClick={() => handleCategorySelect("")}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            All
          </ListItem>
          {categories?.map((c) => (
            <ListItem
              key={c._id}
              className={clx(
                "group rounded-none py-1.5 px-3 text-sm font-medium text-blue-gray-700 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-200 focus:text-gary-700",
                categoryQuery === c._id ? "bg-indigo-50 text-indigo-700" : "text-blue-gray-700"
              )}
              onClick={() => handleCategorySelect(c._id)}
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
          <div className="mt-3 flex flex-wrap gap-2">
            {uniqueColors?.map((color: string) => {
              const isHex = color.startsWith("#");
              const ringClass = isHex ? "" : `ring-${color}-500`;
              const inlineStyle = isHex ? { boxShadow: `0 0 0 2px ${color}` } : {};

              return (
                <div
                  key={color}
                  onClick={() => handleColorsQuery(color)}
                  className={clx(
                    "relative flex size-10 cursor-pointer items-center justify-center rounded-full focus:outline-none",
                    selectedColors.includes(color) ? "ring-2 ring-offset-0.5" : "",
                    color === "white" && "ring-black",
                    color === "black" ? "ring-black" : ringClass
                  )}
                  style={inlineStyle}
                  aria-label={color}
                  aria-pressed={selectedColors.includes(color)}
                >
                  <div
                    className="size-8 rounded-full border border-black/10"
                    arial-hidden={true}
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              );
            })}
          </div>
          {selectedColors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              <p className="text-sm text-gray-700">Selected: {selectedColors.join(", ")}</p>
            </div>
          )}
        </List>
      </div>

      <div className="relative mt-4 pb-5 border-b">
        <h1 className="sm:text-lg lg:text-xl font-bold">Size</h1>
        <List
          className="p-0 mt-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="mt-4 grid grid-cols-4 gap-4">
            {uniqueSizes?.map((size) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizesQuery(size)}
                  className={clx(
                    "flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium uppercase focus:outline-none",
                    "cursor-pointer hover:bg-gray-50",
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-300 text-gray-900"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {selectedSizes.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-700">Selected: {selectedSizes.join(", ")}</p>
            </div>
          )}
        </List>
      </div>

      <div className="relative mt-4 pb-5 border-b">
        <h1 className="sm:text-lg lg:text-xl font-bold">Price Range</h1>
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange.max)}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <span className="mx-2 text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange(priceRange.min, Number(e.target.value))}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="rounded text-center bg-indigo-600 text-white font-medium text-sm w-full px-2 py-2.5 capitalize mt-4"
        type="button"
      >
        clear filter
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
        <div className="hidden lg:block flex-1 max-w-sm fixed top-32 w-full h-screen">
        <div className="w-full h-full overflow-y-auto p-3.5 pb-32">
          <div className="relative">
            <MagnifyingGlassIcon className="eye-icon absolute top-[50%] translate-y-[-50%] left-4 cursor-pointer text-xl text-gray-700" />
            <input
              id="search"
              name="search"
              type="text"
              placeholder="search for product here..."
              onChange={handleSearch}
              value={searchQuery}
              className="block w-full rounded-md border-0 py-3 pl-11 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 text-base font-base sm:leading-6"
            />
          </div>

          <FilterPanelContent />
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <Disclosure as="div" className="lg:hidden">
        {({ open }) => (
          <>
            <Disclosure.Button className="fixed bottom-4 right-4 z-10 flex items-center justify-center rounded-full bg-indigo-600 p-3 text-white shadow-lg">
              <span className="sr-only">{open ? "Close filters" : "Open filters"}</span>
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                  />
                </svg>
              )}
            </Disclosure.Button>

            <Disclosure.Panel className="fixed inset-0 z-20 bg-gray-500 bg-opacity-75 transition-opacity lg:hidden" />

            <Disclosure.Panel className="fixed inset-y-0 right-0 z-30 w-full overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <Disclosure.Button className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
              </div>

              <div className="mt-6 flow-root">
                <div className="divide-y divide-gray-200">
                  <FilterPanelContent isMobile={true} />
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
