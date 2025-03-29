import { Dialog, RadioGroup } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { classNames, formatPrice } from "../../helpers";
import { setReadNotification } from "../../features/notifications/notification.slice";
import { useAppDispatch } from "../../hooks/redux/redux.hooks";
import { Rating } from "@material-tailwind/react";
import { clx } from "../../util";

type Notification = {
  event_type: string;
  data: any;
  message: string;
};

type Size = {
  name: string;
  inStock: boolean;
};

export const ProductNotificationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  notification: Notification;
}> = ({ open, onClose, notification }) => {
  const { data } = notification;

  const dispatch = useAppDispatch();

  return (
    <Dialog open={open} onClose={onClose} className="relative z-30">
      <Dialog.Backdrop className="fixed inset-0 z-20 hidden bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block" />

      <div className="fixed inset-0 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <Dialog.Panel className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl">
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => {
                  onClose();

                  setTimeout(() => {
                    dispatch(setReadNotification(notification));
                  }, 2000);
                }}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={`${data?.name}`}
                  src={data?.imageSrc?.url}
                  className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{data?.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">{formatPrice(data?.price)}</p>

                    {/* Reviews */}
                    <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Rating
                            value={data?.ratings}
                            className="h-8 !stroke-[1] disabled"
                            placeholder={undefined}
                            aria-disabled={true}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          />
                        </div>
                        <p className="sr-only">{data?.ratings} out of 5 stars</p>
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
                      <p className="text-sm font-normal text-gray-700">{data?.description}</p>
                    </div>
                  </section>

                  <section aria-labelledby="options-heading" className="mt-5">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    {data?.colors?.length !== 0 && (
                      <div aria-label="Choose a color" className="mt-3">
                        <legend className="text-base sm:text-lg font-medium text-gray-900 mt-6">
                          Color
                        </legend>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {data?.colors?.map((color: any) => (
                            <button
                              key={color}
                              type="button"
                              className={clx(
                                "relative flex size-10 cursor-default items-center justify-center rounded-full focus:outline-none"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  "size-8 rounded-full border border-black/10",
                                  color === "white" || color === "black"
                                    ? `bg-${color}`
                                    : `bg-${color}-600`
                                )}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {data?.sizes && data?.sizes?.length !== 0 && (
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

                        <RadioGroup className="mt-4 grid grid-cols-4 gap-4">
                          {data?.sizes?.map((size: Size) => (
                            <RadioGroup.Option
                              key={size?.name}
                              value={size}
                              // disabled={!size?.inStock}
                              className={classNames(
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase focus:outline-none",
                                size?.inStock
                                  ? "cursor-pointer hover:bg-gray-50"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200"
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
