import { useState } from "react";
import { Dialog, RadioGroup } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { classNames, formatPrice } from "../../helpers";
import { useAddItemToCartMutation } from "../../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../../features/products/product.slice";
import { ProductType } from "../../types/redux/product";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { useAppDispatch } from "../../hooks/redux/redux.hooks";
import { addItemToCart as addProductToCart } from "../../features/cart/cart.reducer";

const ProductPreviewModal: React.FC<{ open: boolean; onClose: () => void; productId: string }> = ({
  open,
  onClose,
  productId,
}) => {
  const [addItemToCart] = useAddItemToCartMutation();
  const { data } = useGetProductByIdQuery(productId);
  const [refreshTrigered, setRefreshTrigered] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [quantityInput, setQuantityInput] = useState<number>(1);

  const dispatch = useAppDispatch();

  const product: ProductType = data?.data.product;

  const handleAddItemToCart = async (
    event: React.FormEvent<HTMLFormElement>,
    productId: string
  ) => {
    event.preventDefault();
    try {
      const response = await addItemToCart({ productId, quantity: quantityInput }).unwrap();
      setRefreshTrigered(!refreshTrigered);

      dispatch(addProductToCart(response));

      if (response?.message) {
        toast.success(response?.message);
        setMessage(message);
      }
    } catch (error: any) {
      if (error?.data) {
        toast.warn(error?.data?.message);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-20">
      <Dialog.Backdrop className="fixed inset-0 z-10 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <Dialog.Panel className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={`${product?.name}`}
                  src={product?.imageSrc?.url}
                  className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover col-span-full lg:col-span-5"
                />
                <div className="lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">{formatPrice(product?.price)}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product?.ratings > rating ? "text-gray-900" : "text-gray-200",
                                "size-5 shrink-0"
                              )}
                            />
                          ))}
                        </div>
                        <p className="sr-only">{product?.ratings} out of 5 stars</p>
                        <a
                          href="#"
                          className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500"
                        >
                          {/* {product.reviewCount} reviews */}
                        </a>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h1 className="text-base sm:text-lg font-medium">Desscription</h1>
                      <p className="text-sm font-normal text-gray-700">{product?.description}</p>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-5">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form onSubmit={(event) => handleAddItemToCart(event, product?._id)}>
                      {/* Colors */}
                      {product?.colors.length !== 0 && (
                        <fieldset aria-label="Choose a color">
                          <legend className="text-sm font-medium text-gray-900">Color</legend>

                          <RadioGroup className="mt-4 flex items-center space-x-3">
                            {product?.colors?.map((color) => (
                              <RadioGroup.Option
                                key={color}
                                value={color}
                                aria-label={color}
                                className={classNames(
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                                )}
                              >
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    "size-8 rounded-full border border-black/10"
                                  )}
                                />
                              </RadioGroup.Option>
                            ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      {product?.sizes && product?.sizes?.length !== 0 && (
                        <fieldset aria-label="Choose a size" className="mt-5">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">Size</div>
                            <a
                              href="#"
                              className="text-sm font-medium text-gray-600 hover:text-gray-500"
                            >
                              Size guide
                            </a>
                          </div>

                          <RadioGroup className="mt-4 grid grid-cols-4 gap-4">
                            {product?.sizes?.map((size) => (
                              <RadioGroup.Option
                                key={size?.name}
                                value={size}
                                disabled={!size?.inStock}
                                className={classNames(
                                  size?.inStock
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-gray-500 sm:flex-1"
                                )}
                              >
                                <span>{size?.name}</span>
                                {size?.inStock ? (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      stroke="currentColor"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      className="absolute inset-0 size-full stroke-2 text-gray-200"
                                    >
                                      <line
                                        x1={0}
                                        x2={100}
                                        y1={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      <div className="relative flex items-center space-x-3 mt-5">
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
                        <fieldset aria-label="Product quantity">
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

                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:gray-indigo-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
export default ProductPreviewModal;
