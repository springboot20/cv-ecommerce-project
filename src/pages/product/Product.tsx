import { PlusIcon, MinusIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Disclosure, Tab } from "@headlessui/react";
import { gridVariants } from "../../util/framerMotion.config";
import { classNames, formatPrice } from "../../helpers";
import { ProductSkeletonLoading } from "../../components/loaders/Skeleton";
import CartModal from "../../components/modal/CartModal";
import { useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { clx } from "../../util";
import { toast } from "react-toastify";
import { useGetProductsByCategoryQuery } from "../../features/products/product.slice";
import { ProductType, Rating } from "../../types/redux/product";
import ProductRatings from "./ProductRating";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

type Size = {
  _id: string;
  name: string;
  inStock: boolean;
};

const Product = () => {
  const navigate = useNavigate();

  const {
    refetch,
    open,
    setOpen,
    isLoading,
    setQuantityInput,
    quantityInput,
    handleAddItemToCart,
    summary,
    product,
    message,
    page,
    ratings,
    setPage,
  } = useProduct();

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);

  const { data, refetch: refetchCategory } = useGetProductsByCategoryQuery(
    {
      categoryId: product?.category?._id,
    },
    {
      skip: !product?.category?._id,
    }
  );
  const products = data?.data?.products;

  useEffect(() => {
    refetch();
    if (product?.category?._id) {
      refetchCategory();
    }

    toast.success(message);
  }, [refetch, message, refetchCategory]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: Size) => {
    console.log(size);
    if (size?.inStock) {
      setSelectedSize(size);
    }
  };

  console.log(selectedSize);

  const product_ratings = ratings?.filter(
    (rate: Rating) => rate?.productId === product?._id
  ) as Rating[];

  console.log(product_ratings);

  return (
    <Fragment>
      <CartModal isOpen={open} setIsOpen={setOpen} />

      <motion.main
        layout
        initial="hidden"
        animate="visible"
        variants={gridVariants}
        className="max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 xl:px-0"
      >
        <div className="mb-4 w-max">
          <button
            type="button"
            onClick={() => navigate("/collections")}
            className="py-2 px-4 bg-gray-200 rounded-md"
          >
            <span className="sr-only">Back to products</span>
            <div className="flex items-center gap-2">
              <ArrowLeftCircleIcon className="h-6 text-gray-600" />
              <span className="text-sm font-normal text-gray-600">products</span>
            </div>
          </button>
        </div>
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center lg:place-items-start place-content-center gap-8">
            {isLoading || !data ? (
              <ProductSkeletonLoading />
            ) : (
              <>
                <div className="col-span-full lg:col-span-1 w-full gap-2">
                  <div className="h-[25rem] flex-1 flex-shrink-0 relative rounded-2xl overflow-hidden w-full border">
                    <img
                      src={product?.imageSrc?.url}
                      alt=""
                      className="object-cover appearance-none object-center w-full h-full"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {products
                      ?.slice(0, 3)
                      ?.filter((p: ProductType) => p?._id !== product?._id)
                      ?.map((product: ProductType) => (
                        <div
                          role="button"
                          key={product?._id}
                          className="col-span-1 w-full"
                          onClick={() => navigate(`/collections/${product?._id}`)}
                        >
                          <div className="h-20 bg-white w-full rounded-md p-2 border border-black/25">
                            <img
                              src={product?.imageSrc?.url}
                              alt={product?.name}
                              className="bg-cover h-full w-full"
                            />
                          </div>

                          <div className="space-y-0.5 mt-2">
                            <h3 className="capitalize text-xs font-medium text-gray-800">
                              {product?.name}
                            </h3>
                            <p className="text-xs font-medium text-[#e2342d]">
                              {formatPrice(product?.price ?? 0.0)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-span-full lg:col-span-1 w-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="uppercase text-xl font-bold text-gray-800">{product?.name}</h3>
                      <p className="text-lg font-bold text-[#e2342d]">
                        {formatPrice(product?.price ?? 0.0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center my-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarSolid
                            key={star}
                            className={classNames(
                              "w-5 h-5",
                              star <= Math.round(summary?.averageRating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {summary?.averageRating || 0} out of 5
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h1 className="text-base sm:text-lg font-medium">Desscription</h1>
                    <p className="text-sm font-normal text-gray-700">{product?.description}</p>

                    {product?.colors?.length !== 0 && (
                      <fieldset aria-label="Choose a color" className="mt-3">
                        <legend className="text-base sm:text-lg font-medium text-gray-900 mt-6">
                          Color
                        </legend>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {product?.colors?.map((color) => {
                            const isHex = color.startsWith("#");
                            const ringClass = isHex ? "" : `ring-${color}-500`;
                            const inlineStyle = isHex ? { boxShadow: `0 0 0 2px ${color}` } : {};

                            return (
                              <button
                                key={color}
                                type="button"
                                onClick={() => handleColorChange(color)}
                                className={clx(
                                  "relative flex size-10 cursor-pointer items-center justify-center rounded-full focus:outline-none",
                                  selectedColor === color ? `ring-2 ring-offset-0.5` : "",
                                  color === "white" && "ring-black",
                                  color === "black" ? "ring-black" : ringClass
                                )}
                                  style={inlineStyle}
                                aria-label={color}
                                aria-pressed={selectedColor === color}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    "size-8 rounded-full border border-black/10",
                                  )}
                                                   style={{ backgroundColor: color }}

                                />
                              </button>
                            );
                          })}
                        </div>

                        {selectedColor && (
                          <p className="mt-2 text-sm text-gray-500">
                            Selected:{" "}
                            <span className="font-medium text-gray-900">{selectedColor}</span>
                          </p>
                        )}
                      </fieldset>
                    )}

                    {product?.sizes && product?.sizes?.length !== 0 && (
                      <fieldset aria-label="Choose a size" className="mt-3">
                        <div className="flex items-center justify-between">
                          <div className="text-base sm:text-lg font-medium text-gray-900">Size</div>
                          <a
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-500"
                          >
                            Size guide
                          </a>
                        </div>

                        <div className="mt-4 grid grid-cols-4 gap-4">
                          {product?.sizes?.map((size) => {
                            const isSelected = selectedSize?._id === size?._id;

                            return (
                              <button
                                type="button"
                                key={size?.name}
                                onClick={() => handleSizeChange(size)}
                                className={clx(
                                  "flex items-center justify-center rounded-md border py-2 px-3 text-sm font-medium uppercase focus:outline-none",
                                  "cursor-pointer hover:bg-gray-50",
                                  isSelected
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                    : "border-gray-300 text-gray-900"
                                )}
                              >
                                {size?.name}
                              </button>
                            );
                          })}
                        </div>

                        {selectedSize && (
                          <p className="mt-2 text-sm text-gray-500">
                            Selected:{" "}
                            <span className="font-medium text-gray-900">{selectedSize?.name}</span>
                          </p>
                        )}
                      </fieldset>
                    )}

                    <Disclosure as="ul" className="mt-10 space-y-3">
                      {/* Disclosure items */}
                    </Disclosure>
                  </div>

                  <div className="flex items-center space-x-5 mt-3">{/* Color buttons */}</div>

                  <div className="col-span-full">
                    <div className="relative flex items-center space-x-3">
                      <Button
                        type="button"
                        id="minus-btn"
                        variant="text"
                        ripple={false}
                        onClick={() => setQuantityInput((prevQuantity) => prevQuantity - 1)}
                        className="p-1 text-gray-800 border focus:ring-offset-2 transition-all flex items-center dark:text-white"
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <MinusIcon id="minus-icon" className="h-5 w-5" />
                      </Button>
                      <fieldset>
                        <label htmlFor="quantity" className="sr-only">
                          quantity
                        </label>
                        <input
                          id="quantity"
                          type="number"
                          value={quantityInput}
                          onChange={(e) => setQuantityInput(parseInt(e.target.value))}
                          className="border border-gray-300 rounded-md p-1 text-sm w-16 text-center"
                        />
                      </fieldset>
                      <Button
                        type="button"
                        id="plus-btn"
                        variant="text"
                        ripple={false}
                        className="p-1 text-gray-800 border focus:ring-offset-2 transition-all flex items-center dark:text-white"
                        onClick={() => setQuantityInput((prevQuantity) => prevQuantity + 1)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <PlusIcon id="plus-icon" className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-6 col-span-full">
                      <Button
                        className="w-full uppercase text-center py-3.5 shadow-none text-base mt-8 bg-gray-800 border hover:bg-gray-700 transition rounded font-semibold"
                        onClick={() => handleAddItemToCart(product?._id)}
                        fullWidth
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-7 relative">
           <ProductRatings
                    productId={product?._id}
                    setPage={setPage}
                    page={page}
                    refetch={refetch}
                  />
          </div>
        </section>
      </motion.main>
    </Fragment>
  );
};

export default Product;
