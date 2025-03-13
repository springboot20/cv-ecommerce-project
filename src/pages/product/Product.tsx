import { PlusIcon, MinusIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Button, Rating } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Disclosure, Tab } from "@headlessui/react";
import { gridVariants } from "../../util/framerMotion.config";
import { formatPrice } from "../../helpers";
import { ProductSkeletonLoading } from "../../components/loaders/Skeleton";
import CartModal from "../../components/modal/CartModal";
import { useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useEffect } from "react";
import { clx } from "../../util";
import { toast } from "react-toastify";

const Product = () => {
  const navigate = useNavigate();
  const {
    refetch,
    open,
    setOpen,
    isLoading,
    ratings,
    setQuantityInput,
    quantityInput,
    handleAddItemToCart,
    setRatingsValue,
    product,
    message,
  } = useProduct();

  useEffect(() => {
    refetch();

    toast.success(message);
  }, [refetch, message]);

  return (
    <Fragment>
      <CartModal isOpen={open} setIsOpen={setOpen} />

      <motion.main
        layout
        initial="hidden"
        animate="visible"
        variants={gridVariants}
        className="max-w-2xl lg:max-w-full mx-auto px-4 xl:px-0"
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
            {isLoading ? (
              <ProductSkeletonLoading />
            ) : (
              <>
                <div className="col-span-full lg:col-span-1 w-full flex items-start gap-2">
                  <div className="h-[35rem] flex-1 relative rounded-2xl overflow-hidden w-full">
                    <img
                      src={product?.imageSrc?.url}
                      alt=""
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                </div>
                <div className="col-span-full lg:col-span-1 w-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="uppercase text-xl font-bold text-gray-800">{product?.name}</h3>
                      <p className="text-lg font-bold text-[#e2342d] uppercase">
                        {formatPrice(product?.price ?? 0.0)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Rating
                        value={ratings}
                        className="h-8 !stroke-[1]"
                        onChange={(value) => setRatingsValue(value)}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                      <span className="text-sm font-normal text-gray-600 inline-block">(3.9)</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h1 className="text-base sm:text-lg font-medium">Desscription</h1>
                    <p className="text-sm font-normal text-gray-700">{product?.description}</p>

                    <Disclosure as="ul" className="mt-10 space-y-5">
                      {/* Disclosure items */}
                    </Disclosure>
                  </div>

                  <div className="flex items-center space-x-5 mt-8">{/* Color buttons */}</div>

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
                        className="w-full uppercase text-center py-3.5 shadow-none text-base mt-14 bg-gray-800 border hover:bg-gray-700 transition rounded font-semibold"
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
            <Tab.Group>
              <Tab.List className="border border-b-0 max-w-xs flex items-center">
                <Tab as={React.Fragment}>
                  {({ selected }) => (
                    <button
                      className={clx(
                        selected && "text-gray-800 bg-[#EBEBEB]",
                        "focus:outline-none text-lg font-satoshi font-normal p-3 border-r w-full"
                      )}
                    >
                      Description
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
                      Reviews ({0})
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels className="border w-full">
                <Tab.Panel as="div" className="p-3">
                  <p className="text-lg font-normal text-gray-700">{product?.description}</p>
                </Tab.Panel>

                <Tab.Panel></Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </motion.main>
    </Fragment>
  );
};

export default Product;
