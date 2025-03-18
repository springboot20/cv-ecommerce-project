import { Dialog, RadioGroup } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { classNames, formatPrice } from "../../helpers";
import { setReadNotification } from "../../features/notifications/notification.slice";
import { useAppDispatch } from "../../hooks/redux/redux.hooks";

type Notification = {
  event_type: string;
  data: any;
  message: string;
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
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                data?.ratings > rating ? "text-gray-900" : "text-gray-200",
                                "size-5 shrink-0"
                              )}
                            />
                          ))}
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

                    {data?.colors.length !== 0 && (
                      <fieldset aria-label="Choose a color">
                        <legend className="text-sm font-medium text-gray-900">Color</legend>

                        <RadioGroup className="mt-4 flex items-center space-x-3">
                          {data?.colors?.map((color: string) => (
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
                                className={classNames("size-8 rounded-full border border-black/10")}
                              />
                            </RadioGroup.Option>
                          ))}
                        </RadioGroup>
                      </fieldset>
                    )}
                    {data?.sizes && data?.sizes?.length !== 0 && (
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
                          {data?.sizes?.map((size: any) => (
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
