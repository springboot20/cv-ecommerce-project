/** @format */

import { Fragment, useState } from "react";
import cartImage from "../../assets/cart-image.jpg";
import { Link } from "react-router-dom";
import { IconType } from "../../components/icon/IconType";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/icon/Button";
import { formatPrice } from "../../helpers/index";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { useGetUserCartQuery } from "../../features/cart/cart.slice";

const Cart = () => {
  // Redux variables
  // const { data, isLoading, isError } = useGetUserCartQuery();
  const auth = useAppSelector((state: RootState) => state.auth);
  const { cartItems, isNewAddedToCart } = useAppSelector((state: RootState) => state.cart);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [quantityInput, setQuantityInput] = useState<number>(0);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleEditClick = (id: string) => {
    const selectedItem = cartItems.find((cart) => {
      cart.items.map((item) => {
        item.product._id === id;
      });
    });

    if (selectedItem) {
      if (selectedItem) {
        selectedItem.items.map((item) => {
          setQuantityInput(item.quantity); // Set initial quantity input to current quantity
        });

        setSelectedItemId(id);
        setIsEditing(true);
      }
    }
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
    setIsEditing(false);
  };

  return (
    <Fragment>
      <div className="h-full relative px-4 py-8">
        <div>
          <h1 className="font-bold text-2xl text-gray-800 dark:text-white leading-5">
            Shopping Cart
          </h1>
        </div>
        <div className="relative flex items-stretch flex-col xl:flex-row xl:justify-between flex-shrink-0 mt-8">
          <div className="flex-shrink-0 relative left-0 right-0 flex-1 xl:right-[28rem] xl:w-[calc(100%-28rem)]">
            <div className="flex-1">
              <div className="rounded-md border bg-white border-gray-300 mb-12 p-10">
                {cartItems?.length === 0 ? (
                  <div className="flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <img
                        src={cartImage}
                        alt=""
                        className="max-w-full h-auto align-middle object-contain object-center block"
                      />
                    </div>
                    <p className="text-xl font-semibold text-gray-800 mb-6">
                      Your cart is empty. Keep shopping to find a product!
                    </p>
                    <Link
                      to="/collections"
                      className="bg-gray-800 hover:bg-gray-600 rounded-md px-5 py-4 text-xl font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-20"
                    >
                      Keep Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cartItems?.map((cartItem) =>
                          cartItem?.items?.map((item) => (
                            <li key={item?.product._id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.product.imageSrc.url}
                                  alt={"product image"}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between  font-medium text-gray-900">
                                    <h3 className="text-gray-800 font-semibold text-xl">
                                      {item?.product.name}
                                    </h3>
                                    <p className="ml-4 text-xl">
                                      {formatPrice(item?.product.price)}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  {selectedItemId === item.product._id && isEditing ? (
                                    <div className="flex items-center space-x-4">
                                      <fieldset>
                                        <label htmlFor="quantity" className="sr-only">
                                          quantity
                                        </label>
                                        <input
                                          id="quantity"
                                          type="number"
                                          value={quantityInput}
                                          onChange={(e) =>
                                            setQuantityInput(parseInt(e.target.value))
                                          }
                                          className="border border-gray-300 rounded-md p-1 text-sm w-16"
                                        />
                                      </fieldset>
                                      <Button
                                        type="button"
                                        onClick={() => console.log("clicked")}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        type="button"
                                        onClick={handleCancelEdit}
                                        className="font-medium text-gray-500 hover:text-gray-400"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-gray-500">Qty {item?.quantity}</p>
                                      <div className="flex space-x-4 items-center">
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            // removeFromCart(item.product?.id);
                                          }}
                                          className="font-medium text-red-600 hover:text-red-500"
                                        >
                                          <IconType icon={faTrashAlt} className="h-6" />
                                        </Button>
                                        <Button
                                          type="button"
                                          onClick={() => handleEditClick(item.product._id)}
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                          <IconType icon={faEdit} className="h-6" />
                                        </Button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </li>
                          )),
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative flex-1 max-w-md w-full flex-col right-0 left-0 xl:ml-3">
            <div className="p-6 bg-white rounded-lg border w-full">
              <h3 className="text-base sm:text-lg font-medium text-gray-800">Order summary</h3>

              <ul className="mt-3">
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">subtotal</span>
                  <span className="font-semibold text-sm text-gray-800">{formatPrice(90)}</span>
                </li>
                <li className="border-b py-3 px-2 flex items-center justify-between">
                  <span className="text-gray-600 text-sm font-normal capitalize">
                    shipping estimate
                  </span>
                  <span className="font-semibold text-sm text-gray-800">{formatPrice(5)}</span>
                </li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-gray-800">Order total</h3>
                <span className="font-semibold text-base text-gray-800">{formatPrice(112.32)}</span>
              </div>

              <div className="mt-4">
                <Button className="text-base font-semibold text-white py-2.5 px-2 rounded bg-gray-800 w-full block">
                  checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
