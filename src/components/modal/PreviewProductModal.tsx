import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames, formatPrice } from "../../helpers";
import { useAddItemToCartMutation } from "../../features/cart/cart.slice";
import { useGetProductByIdQuery } from "../../features/products/product.slice";
import { ProductType } from "../../types/redux/product";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { useAppDispatch } from "../../hooks/redux/redux.hooks";
import { addItemToCart as addProductToCart } from "../../features/cart/cart.reducer";
import { clx } from "../../util";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useProduct } from "../../hooks/useProduct";
import { useGetProductRatingsQuery } from "../../features/ratings/rate.slice";

type Size = {
  _id: string;
  name: string;
  inStock: boolean;
};

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
  const { page } = useProduct();

  const { data: ratingsData } = useGetProductRatingsQuery(
    {
      productId,
      page,
      limit: 5,
    },
    { skip: !productId }
  );
  const { summary = {} } = ratingsData?.data || {};

  const product: ProductType = data?.data.product;
  const dispatch = useAppDispatch();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size: Size) => {
    if (size?.inStock) {
      setSelectedSize(size);
    }
  };

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
    <Dialog open={open} onClose={onClose} className="relative z-30">
      <Dialog.Backdrop className="fixed inset-0 z-20 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <Dialog.Panel className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-500 sm:right-2 sm:top-1 md:right-2 md:top-1.5 lg:right-4 lg:top-4"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={`${product?.name}`}
                  src={product?.imageSrc?.url}
                  className="aspect-[3/3] md:aspect-[2/1.5] lg:aspect-[3/5] lg:min-h-full w-full rounded-lg bg-gray-100 object-cover col-span-full lg:col-span-5"
                />
                <div className="col-span-full lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">{formatPrice(product?.price)}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
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
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-5">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form
                      onSubmit={(event) => {
                        handleAddItemToCart(event, product?._id);

                        onClose();
                      }}
                    >
                      {/* Colors */}
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
                                  aria-label={color}
                                  style={inlineStyle}
                                  aria-pressed={selectedColor === color}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      "size-8 rounded-full border border-black/10"
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
                            <div className="text-base sm:text-lg font-medium text-gray-900">
                              Size
                            </div>
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
                              <span className="font-medium text-gray-900">
                                {selectedSize?.name}
                              </span>
                            </p>
                          )}
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
